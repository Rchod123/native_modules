import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  add(a: number, b: number): number | null;
  subtract(a: number, b: number): number | null;
  multiply(a: number, b: number): number | null;
  divide(a: number, b: number): number | null;
  modulus(a: number, b: number): number | null;
  exponent(a: number): number | null;
  squareRoot(a: number): number | null;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeFunctions');
