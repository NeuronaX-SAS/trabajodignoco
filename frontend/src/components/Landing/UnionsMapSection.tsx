'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Replace unionData with real union info for Bogotá:
const unionData = [
  {
    id: 'u1',
    name: 'AGRECONDUCTORES',
    address: 'Carrera 37 No. 25 A - 33, Bogotá',
    phone: '2699306',
    coordinates: { x: 410, y: 320 }, // Approximate on SVG
  },
  {
    id: 'u2',
    name: 'ASOGOBIERNO',
    address: 'Calle 12B No. 8-23 Oficina 501, Bogotá',
    phone: '2820188',
    coordinates: { x: 420, y: 330 },
  },
  {
    id: 'u3',
    name: 'SEPUCADIS',
    address: 'Carrera 8 No. 1 C – 50 sur, Bogotá',
    phone: '3387000 Ext. 5251',
    coordinates: { x: 415, y: 340 },
  },
  {
    id: 'u4',
    name: 'SINDISTRITALES',
    address: 'Carrera 9 No. 21 - 68, Bogotá',
    phone: '3413587',
    coordinates: { x: 425, y: 335 },
  },
  {
    id: 'u5',
    name: 'SINTRADISTRITALES',
    address: 'Calle 12 B No. 6 – 82 Of. 704, Bogotá',
    phone: '2431778',
    coordinates: { x: 430, y: 325 },
  },
  {
    id: 'u6',
    name: 'SINTRAMUNICIPALES',
    address: 'Calle 21 No. 8 – 62 Of. 204, Bogotá',
    phone: '2834293',
    coordinates: { x: 435, y: 340 },
  },
  {
    id: 'u7',
    name: 'SUNET REGIONAL BOGOTA',
    address: 'Calle 12B No. 8-39 Of. 220 Edificio Bancoquia, Bogotá',
    phone: '2812559 / 3107858693',
    coordinates: { x: 420, y: 345 },
  },
  {
    id: 'u8',
    name: 'ASONAL JUDICIAL SI',
    address: 'Av Calle 12 # 9 - 23, Piso 2 - Edificio Virrey, Bogotá',
    phone: '312869660 / 3152486810 / 3117202245',
    coordinates: { x: 425, y: 350 },
  },
];

const UnionsMapSection: React.FC = () => {
  const [selectedUnion, setSelectedUnion] = React.useState<string | null>(null);
  
  return (
    <section id="unions-map" className="py-20 bg-[#F2F0F0] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#BFAF8F]/20 rounded-full filter blur-3xl opacity-20 -mr-48 -mb-48"></div>
      </div>
      {/* Section removed as requested */}
    </section>
  );
};

export default UnionsMapSection; 