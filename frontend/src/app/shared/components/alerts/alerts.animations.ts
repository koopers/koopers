import {animate, style, transition, trigger} from '@angular/animations';
export function slideAlert() {
    return trigger(
        'openAlert', [
            transition(':enter', [
                style({transform: 'translateY(-80%)'}),
                animate('500ms ease-in-out', style({transform: 'translateY(0)'}))
            ]),
            transition(':leave', [
                style({transform: 'translateY(0)'}),
                animate('500ms ease-in-out', style({transform: 'translateY(-100%)'}))
            ])
        ]
    );
}

export function closeAllAlerts() {
    return trigger(
        'closeAlerts', [
            transition(':leave', [
                style({transform: 'translateY(0)'}),
                animate('500ms ease-in-out', style({transform: 'translateY(-100%)'}))
            ])
        ]
    );
}