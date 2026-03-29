// Project data — thumbnails use Unsplash static images for reliable display
// In production, replace videoSrc with actual video files
import giphyGif from '../assets/giphy.gif';

export const projects = [
  {
    id: '01',
    title: 'Neon Requiem',
    category: 'Short Film',
    tags: ['Narrative', 'Color Grade'],
    thumb: giphyGif,  // 🎬 Replace with your real thumbnail later
    videoSrc: null,
    size: 'large', // col-span-7
  },
  {
    id: '02',
    title: 'Void Sessions',
    category: 'Music Video',
    tags: ['Visual FX', 'Motion'],
    thumb: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    videoSrc: null,
    size: 'medium', // col-span-5
  },
  {
    id: '03',
    title: 'Still Waters',
    category: 'Documentary',
    tags: ['Documentary', 'Edit'],
    thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    videoSrc: null,
    size: 'small', // col-span-4
  },
  {
    id: '04',
    title: 'Reverie',
    category: 'Commercial',
    tags: ['Brand', 'Color'],
    thumb: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?w=1000&q=80',
    videoSrc: null,
    size: 'medium-large', // col-span-8
  },
  {
    id: '05',
    title: 'Ultraviolet',
    category: 'Fashion Film',
    tags: ['Fashion', 'Motion Graphics'],
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    videoSrc: null,
    size: 'full', // col-span-12
  },
  {
    id: '06',
    title: 'Last Light',
    category: 'Short Film',
    tags: ['Narrative', 'Grade'],
    thumb: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    videoSrc: null,
    size: 'half', // col-span-6
  },
  {
    id: '07',
    title: 'Concrete Dreams',
    category: 'Documentary',
    tags: ['Urban', 'Social'],
    thumb: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    videoSrc: null,
    size: 'half', // col-span-6
  },
];
