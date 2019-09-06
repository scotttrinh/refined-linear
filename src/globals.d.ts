interface FeatureInfo {
  name: string;
  description: string;
  screenshot?: string;
  disabled?: string;
}

declare const __featuresList__: string[];
declare const __featuresInfo__: FeatureInfo[];
declare const __featureName__: 'use the __featureName__ variable';
