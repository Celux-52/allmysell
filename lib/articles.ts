import fs from 'fs';
import path from 'path';

export type ArticleLanguageContent = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  content: string;
};

export type Article = {
  slug: string;
  dateISO: string;
  en: ArticleLanguageContent;
  tr: ArticleLanguageContent;
  ru?: ArticleLanguageContent;
  uz?: ArticleLanguageContent;
};

// ——— Utility Helpers ———

/** Strip HTML tags and estimate word count from content */
function estimateWordCount(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(' ').filter(Boolean).length;
}

/** Calculate reading time in minutes (avg 200 words/min) */
export function calculateReadingTime(html: string): number {
  const words = estimateWordCount(html);
  return Math.max(1, Math.ceil(words / 200));
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\n([\s\S]*?)\n---/;
  const match = frontmatterRegex.exec(fileContent);
  const data: Record<string, string> = {};
  let content = fileContent;

  if (match) {
    const fmString = match[1];
    fmString.split('\n').forEach(line => {
      const idx = line.indexOf(':');
      if (idx !== -1) {
        const key = line.slice(0, idx).trim();
        let value = line.slice(idx + 1).trim();
        // Remove surrounding quotes if they exist
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1).replace(/\\"/g, '"');
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1).replace(/\\'/g, "'");
        }
        data[key] = value;
      }
    });
    content = fileContent.replace(match[0], '').trim();
  }

  return { data, content };
}

export async function getAllArticles(lang: 'en' | 'tr' | 'ru' | 'uz' = 'en') {
  let targetLang = lang;
  let dirPath = path.join(process.cwd(), 'content', 'blog', targetLang);
  
  // Fallback to 'en' if directory doesn't exist
  if (!fs.existsSync(dirPath)) {
    targetLang = 'en';
    dirPath = path.join(process.cwd(), 'content', 'blog', 'en');
  }
  
  if (!fs.existsSync(dirPath)) return [];
  
  const files = fs.readdirSync(dirPath);
  
  const articles = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '');
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = parseFrontmatter(fileContent);
      
      return {
        slug,
        dateISO: data.dateISO || '',
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date || '',
        category: data.category || '',
        author: data.author || '',
        content,
        readingTime: calculateReadingTime(content)
      };
    })
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
    
  return articles;
}

export async function getArticleBySlug(slug: string, lang: 'en' | 'tr' | 'ru' | 'uz' = 'en') {
  let filePath = path.join(process.cwd(), 'content', 'blog', lang, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    // Fallback to English if not found
    filePath = path.join(process.cwd(), 'content', 'blog', 'en', `${slug}.mdx`);
  }
  
  if (!fs.existsSync(filePath)) return null;
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = parseFrontmatter(fileContent);
  
  return {
    slug,
    dateISO: data.dateISO || '',
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: data.date || '',
    category: data.category || '',
    author: data.author || '',
    content,
    readingTime: calculateReadingTime(content)
  };
}
