import React, { useState } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import UnloadedCargoPanel from './UnloadedCargoPanel';
import CargoBaySimulator from './CargoBaySimulator';
import LoadOptimizationPanel from './LoadOptimizationPanel';
import { defaultCargoItems, defaultVehicleSpecs, initialPalletSlots, constraintRules } from '../../utils/mockData/loadBuildingData';
import './LoadBuilding.css';

const LoadBuilder = () => {
  const [cargoItems, setCargoItems] = useState(defaultCargoItems);
  const [vehicle] = useState(defaultVehicleSpecs);
  const [slots, setSlots] = useState(initialPalletSlots);
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [rules, setRules] = useState(constraintRules);

  const handleSelectCargo = (cargo) => {
    setSelectedCargo(cargo);
  };

  const handlePlaceCargo = (slotId) => {
    if (!selectedCargo) return;

    // Place item into slot
    setSlots(prevSlots =>
      prevSlots.map(s => s.id === slotId ? { ...s, item: selectedCargo } : s)
    );

    // Mark cargo as loaded
    setCargoItems(prevCargo =>
      prevCargo.map(c => c.id === selectedCargo.id ? { ...c, loaded: true } : c)
    );

    setSelectedCargo(null);
  };

  const handleUnloadSlot = (slotId) => {
    const targetSlot = slots.find(s => s.id === slotId);
    if (!targetSlot || !targetSlot.item) return;

    const itemId = targetSlot.item.id;

    // Empty slot
    setSlots(prevSlots =>
      prevSlots.map(s => s.id === slotId ? { ...s, item: null } : s)
    );

    // Mark cargo as unloaded
    setCargoItems(prevCargo =>
      prevCargo.map(c => c.id === itemId ? { ...c, loaded: false } : c)
    );
  };

  const handleAutoOptimize = () => {
    // Fill empty slots sequentially with available cargo
    const unloaded = cargoItems.filter(c => !c.loaded);
    let cargoIdx = 0;

    const newSlots = slots.map(slot => {
      if (!slot.item && cargoIdx < unloaded.length) {
        const itemToPlace = unloaded[cargoIdx];
        cargoIdx++;
        return { ...slot, item: itemToPlace };
      }
      return slot;
    });

    const loadedIds = new Set(newSlots.filter(s => s.item).map(s => s.item.id));

    setSlots(newSlots);
    setCargoItems(prev => prev.map(c => ({ ...c, loaded: loadedIds.has(c.id) })));
  };

  return (
    <Layout activePage="load-building">
      <div className="load-building-container">
        <div className="load-building-header">
          <div className="load-building-title">
            <h1>Load Builder Workbench</h1>
            <p>Interactive 2D cargo bay simulator, axle weight distribution, and auto-packing engine</p>
          </div>
          <div className="load-building-actions">
            <button className="lb-btn lb-btn-secondary" onClick={() => setSlots(initialPalletSlots.map(s => ({ ...s, item: null })))}>
              Clear Bay
            </button>
            <button className="lb-btn lb-btn-primary" onClick={() => alert('Load manifest generated and dispatched to warehouse terminal!')}>
              Dispatch Manifest
            </button>
          </div>
        </div>

        <div className="load-builder-workspace">
          {/* Left: Pending Cargo Queue */}
          <UnloadedCargoPanel
            cargoItems={cargoItems}
            selectedCargo={selectedCargo}
            onSelectCargo={handleSelectCargo}
          />

          {/* Center: 2D Cargo Bay Simulator */}
          <CargoBaySimulator
            vehicle={vehicle}
            slots={slots}
            selectedCargo={selectedCargo}
            onPlaceCargo={handlePlaceCargo}
            onUnloadSlot={handleUnloadSlot}
          />

          {/* Right: Optimization & Constraint Engine */}
          <LoadOptimizationPanel
            vehicle={vehicle}
            slots={slots}
            rules={rules}
            onAutoOptimize={handleAutoOptimize}
          />
        </div>
      </div>
    </Layout>
  );
};

export default LoadBuilder;
