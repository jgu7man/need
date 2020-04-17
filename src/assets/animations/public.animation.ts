import {
   transition,
   trigger,
   query,
   style,
   animate,
   group,
   animateChild
} from '@angular/animations';

export const swipePublicAnimation = 
    trigger('swipePublic', [
        transition('directorio => usuario', [
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
        transition('usuario => directorio', [
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
        ])
    ])


var toLeft 
                  
             
                  
             