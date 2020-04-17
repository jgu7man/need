import {
   transition,
   trigger,
   query,
   style,
   animate,
   group,
   animateChild
} from '@angular/animations';

export const swipeUsuarioAnimation = 
    trigger('swipeUsuario', [
        transition('perfil => *', [
            query(':enter, :leave', 
                  style({ position: 'fixed', width: '100%' }), 
                { optional: true }),
            group([
                query(':enter',[
                      style({ transform: 'translateX(-100%)' }),
                      animate('0.5s ease-in-out', 
                      style({ transform: 'translateX(0%)' }))
                  ], { optional: true }),
                  query(':leave', [
                      style({ transform:   'translateX(0%)'}),
                      animate('0.5s ease-in-out', 
                      style({ transform: 'translateX(100%)' }))
                  ], { optional: true }),
            ])
        ]),
        transition('nuevo => *', [
            query(':enter, :leave', 
                  style({ position: 'fixed', width: '100%' }), 
                { optional: true }),
            group([
                query(':enter',[
                      style({ transform: 'translateX(100%)' }),
                      animate('0.5s ease-in-out', 
                      style({ transform: 'translateX(0%)' }))
                  ], { optional: true }),
                  query(':leave', [
                      style({ transform:   'translateX(0%)'}),
                      animate('0.5s ease-in-out', 
                      style({ transform: 'translateX(-100%)' }))
                  ], { optional: true }),
            ])
        ]),
        transition('eventos => nuevo', [
            query(':enter, :leave', 
                  style({ position: 'fixed', width: '100%' }), 
                  { optional: true }),        
             group([
                  query(':enter',[
                      style({ transform: 'translateX(-100%)' }),
                      animate('0.5s ease-in-out', 
                      style({ transform: 'translateX(0%)' }))
                  ], { optional: true }),
                  query(':leave', [
                      style({ transform:   'translateX(0%)'}),
                      animate('0.5s ease-in-out', 
                      style({ transform: 'translateX(100%)' }))
                  ], { optional: true }),
             ])
        ]),
        transition('eventos => perfil', [
            query(':enter, :leave', 
                  style({ position: 'fixed', width: '100%' }), 
                { optional: true }),
            group([
                query(':enter',[
                      style({ transform: 'translateX(100%)' }),
                      animate('0.5s ease-in-out', 
                      style({ transform: 'translateX(0%)' }))
                  ], { optional: true }),
                  query(':leave', [
                      style({ transform:   'translateX(0%)'}),
                      animate('0.5s ease-in-out', 
                      style({ transform: 'translateX(-100%)' }))
                  ], { optional: true }),
            ])
        ]),
        // transition('eventos => directorio', [
        //     query(':enter, :leave', 
        //           style({ position: 'fixed', width: '100%' }), 
        //           { optional: true }),        
        //      group([
        //           query(':enter',[
        //               style({ transform: 'translateX(100%)' }),
        //               animate('0.5s ease-in-out', 
        //               style({ transform: 'translateX(0%)' }))
        //           ], { optional: true }),
        //           query(':leave', [
        //               style({ transform:   'translateX(0%)'}),
        //               animate('0.5s ease-in-out', 
        //               style({ transform: 'translateX(-100%)' }))
        //           ], { optional: true }),
        //      ])
        // ]),
        // transition('perfil => eventos', [
        //    query(':enter, :leave', 
        //           style({ position: 'fixed', width: '100%' }), 
        //           { optional: true }),        
        //      group([
        //          query(':enter', [
        //               style({ transform: 'translateX(-100%)' }),
        //               animate('0.5s ease-in-out', 
        //               style({ transform: 'translateX(0%)' }))
        //           ], { optional: true }),
        //           query(':leave', [
        //               style({ transform:   'translateX(0%)'}),
        //               animate('0.5s ease-in-out', 
        //               style({ transform: 'translateX(100%)' }))
        //           ], { optional: true }),
        //      ])
        // ]),
        // transition('perfil => directorio', [
        //    query(':enter, :leave', 
        //           style({ position: 'fixed', width: '100%' }), 
        //           { optional: true }),        
        //      group([
        //          query(':enter', [
        //               style({ transform: 'translateX(100%)' }),
        //               animate('0.5s ease-in-out', 
        //               style({ transform: 'translateX(0%)' }))
        //           ], { optional: true }),
        //           query(':leave', [
        //               style({ transform:   'translateX(0%)'}),
        //               animate('0.5s ease-in-out', 
        //               style({ transform: 'translateX(-100%)' }))
        //           ], { optional: true }),
        //      ])
        // ]),
        // transition('perfil => nuevo', [
        //    query(':enter, :leave', 
        //           style({ position: 'fixed', width: '100%' }), 
        //           { optional: true }),        
        //      group([
        //          query(':enter', [
        //               style({ transform: 'translateX(-100%)' }),
        //               animate('0.5s ease-in-out', 
        //               style({ transform: 'translateX(0%)' }))
        //           ], { optional: true }),
        //           query(':leave', [
        //               style({ transform:   'translateX(0%)'}),
        //               animate('0.5s ease-in-out', 
        //               style({ transform: 'translateX(100%)' }))
        //           ], { optional: true }),
        //      ])
        // ]),
    ])


var toLeft 
                  
             
                  
             