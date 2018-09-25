import { of } from 'rxjs/internal/observable/of';
import { ComponentFixture, TestBed, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: { paramMap: { get: () => '3' } }
        };
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocation },
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100 }));
    });

    // it('should call updateHero when save is called', (done) => {
    //     mockHeroService.updateHero.and.returnValue(of({}));

    //     fixture.detectChanges();

    //     fixture.componentInstance.saveAsync();

    //     setTimeout(() => {
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //         done();
    //     }, 300);
    // });

    // it('should call updateHero when save is called (fakeAsync)', fakeAsync(() => {
    //     mockHeroService.updateHero.and.returnValue(of({}));

    //     fixture.detectChanges();

    //     fixture.componentInstance.saveAsync();

    //     // tick(250);
    //     flush();

    //     expect(mockHeroService.updateHero).toHaveBeenCalled();
    // }));

    it('should call updateHero when save is called (async)', async(() => {
        mockHeroService.updateHero.and.returnValue(of({}));

        fixture.detectChanges();

        fixture.componentInstance.savePromise();

        fixture.whenStable().then(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
        });
    }));
});
