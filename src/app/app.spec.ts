import '@angular/compiler';
import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { App } from './app';

describe('App Component', () => {
  let component: App;

  beforeAll(() => {
    if (!(TestBed as any)._instantiated) {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    }
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [App]
    });

    component = TestBed.inject(App);
  });

  it('debería crearse correctamente usando el motor de Angular', () => {
    expect(component).toBeTruthy();
  });
});