Add-Type -AssemblyName System.Drawing

$inputPath = "c:\Users\melih\OneDrive\Desktop\allmysell-main\app\icon.png"
$outputPath = "c:\Users\melih\OneDrive\Desktop\allmysell-main\clutch-logo-500.png"

$img = [System.Drawing.Image]::FromFile($inputPath)
Write-Host "Original size: $($img.Width)x$($img.Height)"

$resized = New-Object System.Drawing.Bitmap($img, 500, 500)
$resized.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
$resized.Dispose()

$fi = Get-Item $outputPath
Write-Host "Saved: $outputPath"
Write-Host "File size: $([math]::Round($fi.Length/1KB, 1)) KB"
Write-Host "Done!"
