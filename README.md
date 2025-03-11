# Wardrobe 3D Designer

A powerful web application for designing custom wardrobes in 3D. This tool allows users to create, customize, and visualize wardrobe designs before purchasing.

## Features

- **3D Visualization**: Real-time 3D rendering of your wardrobe design
- **Customizable Dimensions**: Adjust width, height, and depth to fit your space
- **Multiple Wardrobe Types**: Standard, corner, sliding, and walk-in options
- **Component Library**: Add shelves, drawers, rails, dividers, and specialized storage
- **Material Selection**: Choose from various materials and finishes
- **Price Calculation**: Get instant price estimates as you design
- **Wardrobe Templates**: Start with pre-designed templates for quick inspiration

## Wardrobe Templates

The application includes several pre-designed wardrobe templates to help users get started quickly:

- **Classic Walk-in Closet**: A spacious walk-in closet with ample hanging space, drawers, and shelving
- **Modern Sliding Wardrobe**: A contemporary wardrobe with sliding doors, perfect for bedrooms with limited space
- **Luxury Dressing Room**: An elegant dressing room with a central island, mirror, and specialized storage for accessories
- **Family Wardrobe**: A practical wardrobe design with sections for different family members and varied storage options
- **Minimalist Wardrobe**: A clean, simple design with essential storage for a minimalist lifestyle

To use a template:
1. Click the "Browse Wardrobe Templates" button at the top of the control panel
2. Browse through the available templates
3. Select a template that matches your needs
4. Click "Apply Template" to load it into the designer
5. Customize the template further to suit your specific requirements

## Getting Started

1. Choose a wardrobe type (standard, corner, sliding, or walk-in)
2. Set the dimensions to fit your space
3. Select materials for the body, doors, and handles
4. Add components like shelves, drawers, and rails
5. Adjust the position and size of components as needed
6. View the price estimate and make adjustments as necessary

## Technical Details

This application is built with:
- Next.js for the frontend framework
- Three.js for 3D rendering
- Zustand for state management
- Tailwind CSS for styling

## Development

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
