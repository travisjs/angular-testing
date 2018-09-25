import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have correct hero', () => {
        fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };

        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    });

    it('should render the hero name in an achor tag (native)', () => {
        fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });

    it('should render the hero name in an achor tag (debug)', () => {
        fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('SuperDude');
    });
});
