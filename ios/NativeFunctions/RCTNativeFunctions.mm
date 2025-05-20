//
//  RCTNativeFunctions.m
//  NativeModels
//
//  Created by Rajesh C on 20/05/25.
//

#import "RCTNativeFunctions.h"

@implementation RCTNativeFunctions




+ (NSString *)moduleName { 
  return @"NativeFunctions";
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params { 
  return std:: make_shared<facebook::react::NativeFunctionsSpecJSI>(params);
}

- (NSNumber * _Nullable)add:(double)a b:(double)b {
  double result = a + b;
  return [NSNumber numberWithDouble:result];
}

- (NSNumber * _Nullable)divide:(double)a b:(double)b { 
  double result = a / b;
  return [NSNumber numberWithDouble:result];
}

- (NSNumber * _Nullable)exponent:(double)a { 
  double result = exp(a);
  return [NSNumber numberWithDouble:result];
}

- (NSNumber * _Nullable)modulus:(double)a b:(double)b { 
  if (b == 0) {
      return nil; // Avoid division by zero
  }
  double result = fmod(a, b);
  return [NSNumber numberWithDouble:result];
}

- (NSNumber * _Nullable)multiply:(double)a b:(double)b { 
  double result = a * b;
  return [NSNumber numberWithDouble:result];
}

- (NSNumber * _Nullable)squareRoot:(double)a { 
  double result = a * a;
  return [NSNumber numberWithDouble:result];
}

- (NSNumber * _Nullable)subtract:(double)a b:(double)b { 
  double result = a - b;
  return [NSNumber numberWithDouble:result];
}

@end
