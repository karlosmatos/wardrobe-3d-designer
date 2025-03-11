# 3D Wardrobe Designer

A web application built with Next.js and Three.js that allows users to design custom wardrobes in 3D.

## Features

- Choose from different wardrobe types (standard, corner, sliding, walk-in)
- Customize dimensions (width, height, depth)
- Select materials for different parts of the wardrobe
- Add and manage components (shelves, drawers, rails, doors)
- Real-time 3D visualization
- Price calculation based on selected options

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Three.js
- React Three Fiber
- Tailwind CSS
- Zustand (for state management)
- Headless UI (for UI components)

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wardrobe-3d-designer.git
   cd wardrobe-3d-designer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Select Wardrobe Type**: Choose from standard, corner, sliding, or walk-in wardrobe types.
2. **Adjust Dimensions**: Customize the width, height, and depth of your wardrobe.
3. **Choose Materials**: Select materials for the body, doors, and handles.
4. **Add Components**: Add shelves, drawers, rails, and doors to your wardrobe.
5. **View Price**: See the calculated price based on your selections.

## Project Structure

```
wardrobe-3d-designer/
├── app/
│   ├── components/
│   │   ├── wardrobe/
│   │   │   ├── WardrobeModel.tsx
│   │   │   └── WardrobeScene.tsx
│   │   ├── ui/
│   │   │   ├── WardrobeTypeSelector.tsx
│   │   │   ├── DimensionsControl.tsx
│   │   │   ├── MaterialSelector.tsx
│   │   │   ├── ComponentsManager.tsx
│   │   │   └── PriceSummary.tsx
│   │   └── WardrobeDesigner.tsx
│   ├── store/
│   │   └── wardrobeStore.ts
│   ├── types/
│   │   └── wardrobe.ts
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
└── README.md
```

## Future Enhancements

- Save and load designs
- Export designs as 3D models or blueprints
- Share designs with others
- More wardrobe types and components
- Advanced material options with textures
- Mobile-friendly controls

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Three.js](https://threejs.org/)
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Headless UI](https://headlessui.com/)
