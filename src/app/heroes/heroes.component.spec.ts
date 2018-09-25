import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs/internal/observable/of';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 8 },
            { id: 3, name: 'SuperDude', strength: 8 },
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        component = new HeroesComponent(mockHeroService);
    });

    describe('delete', () => {
        it('should remove the indicated hero from the heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(2);
        });

        it('should call deleteHero with correct parameter', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
    });
});

describe('HeroesComponent (shallow)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 8 },
            { id: 3, name: 'SuperDude', strength: 8 },
        ];

        TestBed.configureTestingModule({
            declarations: [HeroesComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should do nothing', () => {
        expect(true).toBe(true);
    });

    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should create one list item for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });
});

describe('HeroesComponent (deep)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 8 },
            { id: 3, name: 'SuperDude', strength: 8 },
        ];

        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);

        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();
    });

    it('should be true', () => {
        expect(true).toBe(true);
    });

    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(heroComponents.length).toBe(3);

        for (let i = 0; i < heroComponents.length; i++) {
            expect(heroComponents[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');

        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // 1
        heroComponents[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => { } });
        // 2
        (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
        // 3
        heroComponents[0].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should add a new hero to the hero list when the add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const name = 'Mr. Freeze';

        mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 4 }));

        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;

        addButton.triggerEventHandler('click', null);

        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroText).toContain(name);
    });
});
