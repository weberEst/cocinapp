import { Component, ElementRef, ViewChildren } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage {
  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;
  
  private cardA!: Animation;
  private cardB!: Animation;
  private cardC!: Animation;
  private cardD!: Animation;

  constructor( private animationCtrl : AnimationController) { }

  ngAfterViewInit() {

    this.cardA = this.animationCtrl
      .create()
      .addElement(this.cardElements.get(0)!.nativeElement)
      .fill('none')
      .duration(900)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' },
      ]);
    
      this.cardB = this.animationCtrl
      .create()
      .addElement(this.cardElements.get(1)!.nativeElement)
      .fill('none')
      .duration(900)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' },
      ]);
    
      this.cardC = this.animationCtrl
      .create()
      .addElement(this.cardElements.get(2)!.nativeElement)
      .fill('none')
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' },
      ]);

      this.cardD = this.animationCtrl
      .create()
      .addElement(this.cardElements.get(3)!.nativeElement)
      .fill('none')
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' },
      ]);

  }

  async playA(){
    await this.cardA.play()
  
  }

  async playB(){
    await this.cardB.play()
  
  }

  async playC(){
    await this.cardC.play()
  
  }

  async playD(){
    await this.cardD.play()
  
  }

}
