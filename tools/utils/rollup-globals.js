const GLOBALS = {
  // angular globals
  '@angular/animations': 'ng.animations',
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/platform-browser': 'ng.platformBrowser',

  // cdk globals
  '@angular/cdk/a11y': 'ng.cdk.a11y',
  '@angular/cdk/coercion': 'ng.cdk.coercion',
  '@angular/cdk/keycodes': 'ng.cdk.keycodes',
  '@angular/cdk/overlay': 'ng.cdk.overlay',
  '@angular/cdk/portal': 'ng.cdk.portal',

  // rxjs globals
  'rxjs/Subject': 'Rx',
  'rxjs/Observable': 'Rx',
  'rxjs/add/operator/takeUntil': 'Rx.Observable.prototype',
  'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
  'rxjs/add/operator/take': 'Rx.Observable.prototype',
  'rxjs/add/observable/merge': 'Rx.Observable',
};

module.exports = GLOBALS;
