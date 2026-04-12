
const products = [
  {
    name: '\"Premium Quality\"Suitable For IPhone13promax Carbon Fiber Phone Case ',
    link: 'https://www.ebay.com/itm/206206506012',
  },
  {
    name: 'Waterproof Floating Pouch Dry Bag Case Cover For iPhone Cell Phone Touchscreen',
    link: 'https://www.ebay.com/itm/206206476060',
  },
  {
    name: 'gaming keyboard and mouse',
    link: 'https://www.ebay.com/itm/206206055435',
  },
  {
    name: 'Magnetic Phone Holder For Car, Dashboard Car Phone Holder Mount Magnetic Stainless Steel Car Phone Holder - Dashboard Mount, Water-resistant, Rotatable ',
    link: 'https://www.ebay.com/itm/206206420598',
  },
  {
    name: 'Professional Camera Tripod Stand Holder Mount For Cell Phone, Portable Tripod, Mobile Phone Live Stream Holder, Camera Tripod ',
    link: 'https://www.ebay.com/itm/206206420282',
  },
  {
    name: '360 Auto Face Tracking Gimbal AI Smart Gimbal Face Tracking Auto Phone Holder For Smartphone Video Vlog Live Stabilizer Tripod',
    link: 'https://www.ebay.com/itm/206206420005',
  },
  {
    name: 'Car Detail Brush Soft Brush Interior Cleaning',
    link: 'https://www.ebay.com/itm/206206419772',
  },
  {
    name: 'Magnetic Cable Clip Under Desk Cable Management Adjustable Cord Holder Wire Organizer And Cable Management Wire Keeper',
    link: 'https://www.ebay.com/itm/206206419446',
  },
  {
    name: 'Universal Car HUD Head Up Display Digital GPS Speedometer',
    link: 'https://www.ebay.com/itm/318130123471',
  },
  {
    name: 'Hidden Camera Car DVR Dash Cam',
    link: 'https://www.ebay.com/itm/318132495681',
  },
  {
    name: 'Wall Mounted Pegboard Tool Organizer',
    link: 'https://www.ebay.com/itm/318132518371',
  },
  {
    name: 'Air Pressure Gauge Meter Tester',
    link: 'https://www.ebay.com/itm/318132548596',
  },
  {
    name: 'Phone Repair Silicone Pad',
    link: 'https://www.ebay.com/itm/318132562539',
  },
  {
    name: '3 in 1 LED Wireless Charger Stand Foldable',
    link: 'https://www.ebay.com/usr/ymglobal',
  },
  {
    name: 'Magnetic MagSafe Wireless Power Bank 5000mAh',
    link: 'https://www.ebay.com/usr/ymglobal',
  },
  {
    name: '360° Rotate Metal Desk Phone Holder',
    link: 'https://www.ebay.com/usr/ymglobal',
  },
  {
    name: 'Car Phone Holder Vent Dashboard',
    link: 'https://www.ebay.com/usr/ymglobal',
  },
  {
    name: 'MagSafe Magnetic Luxury Leather Card Holder Wallet Case',
    link: 'https://www.ebay.com/usr/ymglobal',
  },
  {
    name: '9H HD Tempered Glass Screen Protector',
    link: 'https://www.ebay.com/usr/ymglobal',
  },
  {
    name: 'Adjustable 360° Rotating Laptop Stand',
    link: 'https://www.ebay.com/itm/206006630493',
  },
  {
    name: '360° Rotating Phone Holder',
    link: 'https://www.ebay.com/itm/206006629452',
  },
  {
    name: '8 in 2 USB Hub',
    link: 'https://www.ebay.com/itm/205970305941',
  },
  {
    name: 'Magnetic Power Bank 10000mAh',
    link: 'https://www.ebay.com/itm/205990599969',
  },
  {
    name: '20000mAh 45W Portable Charger',
    link: 'https://www.ebay.com/itm/205970285393',
  },
  {
    name: 'Wired Earphones Lightning',
    link: 'https://www.ebay.com/itm/206002163067',
  },
  {
    name: 'MagSafe Sticker 360 Magnetic Ring 2 Pack',
    link: 'https://www.ebay.com/itm/206189596772',
  },
  {
    name: 'Magnetic Phone Grip Ring Holder for MagSafe',
    link: 'https://www.ebay.com/itm/206189855409',
  },
  {
    name: '8PCS WebCam Cover Slide Camera Privacy',
    link: 'https://www.ebay.com/itm/206189917643',
  },
  {
    name: '3Black for MagSafe Ring Sticker',
    link: 'https://www.ebay.com/itm/206189931472',
  },
  {
    name: 'Bluetooth 5.0 USB Audio Adapter',
    link: 'https://www.ebay.com/itm/206190278629',
  },
  {
    name: 'For iPhone 17 Pro Max Case',
    link: 'https://www.ebay.com/itm/206190239980',
  },
  {
    name: 'Magnetic Phone Case For iPhone 16',
    link: 'https://www.ebay.com/itm/206190264444',
  },
];

const names = products.map(p => p.name);
const uniqueNames = new Set(names);
if (names.length !== uniqueNames.size) {
  console.log("DUPLICATES FOUND!");
  const counts = {};
  names.forEach(name => {
    counts[name] = (counts[name] || 0) + 1;
  });
  Object.keys(counts).forEach(name => {
    if (counts[name] > 1) {
      console.log(`Duplicate: ${name} (${counts[name]} times)`);
    }
  });
} else {
  console.log("No duplicates found.");
}
