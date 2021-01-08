type GameResourceItemTypes = 'img' | 'sound' | 'font'
interface GameResourceItem extends Object {
  type: GameResourceItemTypes
  name: string
  path: string
  isLoad?: boolean
  src?: HTMLImageElement | HTMLAudioElement
}
export type GameResources = GameResourceItem[]

export class Resources {
  progress: number = 0
  
  constructor(public list: GameResources) {
  }

  load(): Promise<boolean | string> {
    return new Promise((resolve) => {
      this.list.forEach((item) => {
        if (item.type === 'img') {
          let img = new Image();
          img.src = item.path;
          img.onload = () => {
            item.isLoad = true
            item.src = img
            let curProgress = this.checkReady()
            if (typeof curProgress !== "boolean") {
              this.progress = curProgress
            } else {
              resolve(curProgress)
            }
          };
        }
        if (item.type === 'sound') {
          let loadFunc = () => {
            sound.removeEventListener('canplaythrough', loadFunc);
            item.isLoad = true
            item.src = sound
            let curProgress = this.checkReady()
            if (typeof curProgress !== "boolean") {
                this.progress = curProgress
            } else {
                resolve(curProgress)
            }
          }
          let sound = new Audio(item.path);
          sound.addEventListener('canplaythrough', loadFunc, false);
          sound.load();
        }
      })
    })
  }

  checkReady(): boolean | number {
    let loaded = this.list.filter(i => (i.hasOwnProperty('isLoad') ? (i.isLoad === true ? true : false) : false))
    if (loaded.length === this.list.length) {
        return true
    }
    return parseInt((loaded.length / this.list.length * 100).toFixed())
  }

  getSrc(type: GameResourceItemTypes, name: string) {
    return this.list.filter((item) => (item.type === type && item.name === name))[0].src
  }
  
  play(name: string): void {
    (this.getSrc('sound', name) as HTMLAudioElement).currentTime = 0;
    (this.getSrc('sound', name) as HTMLAudioElement).play()
  }
}