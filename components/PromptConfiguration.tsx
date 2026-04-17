
import React, { memo, useState } from 'react';
import { PromptConfig } from '../models/PromptConfig';

// Atomic Imports - Only Education Required
import { EducationPanel } from './configuration/EducationPanel';
import { NumericControls } from './configuration/NumericControls';
import { ToggleBar } from './common/ToggleBar';
import { PresetToolbar } from './configuration/PresetToolbar';
import { usePresetController } from '../controllers/usePresetController';

interface ConfigProps {
  config: PromptConfig;
  savedState?: {
      prompt?: string;
      previousContext?: string;
      existingDraft?: string;
      chapterRoadmap?: string;
  };
  setField: (field: string, value: any) => void;
  isLoading: boolean;
}

const PromptConfiguration: React.FC<ConfigProps> = memo(({ config, savedState, setField, isLoading }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Use Enhanced Preset Controller
  const { fileInputRef, triggerImport, handleExport, handleImport, handleReset } = usePresetController(config, setField, savedState);

  return (
    <div className="mt-8 space-y-6">
      
      {/* 0. Project Management (Top Level - Control Panel) */}
      <PresetToolbar 
          onExport={handleExport} 
          onImport={triggerImport} 
          onReset={handleReset}
          isLoading={isLoading} 
          fileInputRef={fileInputRef} 
          handleImport={handleImport} 
      />

      {/* 
          1. Education Engine (The Core Feature) 
          SRP Enforcement: Only EducationPanel is used. 
          Fiction/Medical/Journalistic panels have been removed.
      */}
      <EducationPanel config={config} setField={setField} isLoading={isLoading} />
      
      {/* 2. Advanced Controls (Hidden by default) */}
      <div className="border-t border-gray-800 pt-4 mt-6">
        <ToggleBar 
            label="Pengaturan Lanjutan (Panjang Kata, Visual, Referensi)" 
            isOpen={showAdvanced} 
            onToggle={() => setShowAdvanced(!showAdvanced)} 
        />
        {showAdvanced && (
            <div className="mt-4 animate-fade-in">
                <NumericControls config={config} setField={setField} isLoading={isLoading} />
            </div>
        )}
      </div>
    </div>
  );
});

export default PromptConfiguration;
