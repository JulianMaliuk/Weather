# Weather

## [Demo](https://weather.julian.pp.ua/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

<br />

### 1. Опишите те подходы, которые по вашему мнению следует реализовать в приложении, чтобы снизить эффекты некачественного покрытия wi-fi.
Веб-приложение для планшета на Angular  и веб-сервисах используется в сценарии:
Запуск (открытие) выполняется в зоне качественного покрытия wi-fi
После чего с планшетом пользователь проходит по зонам некачественного покрытия wi-fi, выполняя ряд операций в приложении.
После чего пользователь завершает работу с приложением в зоне качественного покрытия wi-fi.
При этом возможно выключение планшета (с перезагрузкой приложения) по пути пользователя.

1.	Можно кэшировать данные в сервисе и при проблемах сети брать данные из кэша (при перезагрузке потеряем данные)
2.	Реализовать сохранение изменений в LocalStorage и по таймауту делать попытки передачи на сервер.
3.	Использовать Service Workers + SyncManager + indexedDB. В Service Worker-е кэшировать запросы и при наличии возвращать кэш. При проблемах сети сохранять запросы в indexedDB и регистрировать задачу синхронизации. В воркере при появлении сети выполнять запросы и при успешном выполнении удалить задачи из indexedDB.

<br />

### 2. Покажите пример кода (чем меньше строк и символов, тем лучше), обеспечивающий передачу данных между контроллерами одного приложения Angular.

1.	Передача по дереву вверх/вниз с использованием Output() и Input() 
```
@Component({
  selector: 'app-parent',
  template: '<app-child (changeName)="change($event)" [userName]="userName"></app-child>',
})
export class ParentComponent {
  userName: string = 'Вася';
  // handle the event from the child component
  change(name) {}
}

@Component({
  selector: 'app-child',
  template: '{{ name }}',
})
export class ChildComponent {
  name: string
  // getting data from the parent component
  @Input() set userName(name: string) { this.name = name; }
  @Output() changeName = new EventEmitter<string>();
  change() {
    // send the event up the tree
    this.changeName.emit('New name')
  }
}
```
2. Использование сервиса

```
@Injectable({ providedIn: 'root' })
export class MyService {
  counter: number = 1
  private counterSubject$ = new BehaviorSubject<number>(this.counter)
  // create an Observable that you can subscribe
  counterChanged$ = this.counterSubject$.asObservable()
  
  increment() {
    // passing the new value to subscribers
    this.counterSubject$.next(++this.counter)
   }
}

@Component({
  selector: 'app-my',
  template: '',
})
export class MyComponent implements OnInit, OnDestroy {
  interval: any;
  destroy$ = new Subject<void>();
  constructor(private myService: MyService) { }

  ngOnInit(): void {
    // subscribe to updates
    this.myService.counterChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(counter => console.log(`counter: ${counter}`))

    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.myService.increment());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```
3. Использование Redux

<br />

### Screenshot
![Screenshot](/Screenshot.png)
