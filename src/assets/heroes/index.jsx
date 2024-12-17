import Juno from './juno.webp'
import Hanzo from './hanzo.webp'
import Ana from './ana.webp'
import Baptiste from './baptiste.webp'
import Bastion from './bastion.webp'
import Brigitte from './brigitte.webp'
import Ashe from './ashe.webp'
import Cassidy from './cassidy.webp'
import Dva from './dva.webp'
import Doomfist from './doomfist.webp'
import Echo from './echo.webp'
import Genji from './genji.webp'
import Illari from './illari.webp'
import Junker_Queen from './junker_queen.webp'
import Junkrat from './junkrat.webp'
import Kiriko from './kiriko.webp'
import Lifeweaver from './lifeweaver.webp'
import Lucio from './lucio.webp'
import Mauga from './mauga.webp'
import Mei from './mei.webp'
import Mercy from './mercy.webp'
import Moira from './moira.webp'
import Orisa from './orisa.webp'
import Pharah from './pharah.webp'
import Ramattra from './ramattra.webp'
import Reaper from './reaper.webp'
import Reinhardt from './reinhardt.webp'
import Roadhog from './roadhog.webp'
import Sigma from './sigma.webp'
import Sojourn from './sojourn.webp'
import Soldier76 from './soldier-76.webp'
import Sombra from './sombra.webp'
import Symmetra from './symmetra.webp'
import Torbjorn from './torbjorn.webp'
import Tracer from './tracer.webp'
import Venture from './venture.webp'
import Widowmaker from './widowmaker.webp'
import Winston from './winston.webp'
import WreckingBall from './wrecking_ball.webp'
import Zarya from './zarya.webp'
import Zenyatta from './zenyatta.webp'
import Hazard from './hazard.webp'

export const HeroImages = {
    hazard: Hazard,
    hazardIcon: (
        <div className={`w-[200px] m-auto mt-24`}>
            <img src={`${Hazard}`} />
        </div>
    ),
    juno: Juno,
    junoIcon: (
        <div className={`w-[200px] m-auto mt-16`} title="test">
           <img src={`${Juno}`} />
        </div>
    ),
    hanzo: Hanzo,
    hanzoIcon: (
        <div className={`w-[190px] m-auto mt-20`} title="test">
           <img src={`${Hanzo}`} />
        </div>
    ),
    ana: Ana,
    anaIcon: (
        <div className="flex justify-center items-center pt-20">
            <img src={Ana}  width="100%" className="w-[300px]"/>
        </div>
    ),
    ashe: Ashe,
    asheIcon: (
        <div className={`w-[490px] ml-[-200px] mr-[-120px] mt-[-32px]`} title="test">
           <img src={`${Ashe}`} />
        </div>
    ),
    baptiste: Baptiste,
    baptisteIcon: (
        <div className="flex justify-center items-center pt-16">
            <img src={Baptiste}  width="100%" className="w-[150px]"/>
        </div>
    ),
    bastion: Bastion,
    bastionIcon: (
        <div className={`w-[150px] m-auto mt-24`} title="test">
           <img src={`${Bastion}`} />
        </div>
    ),
    brigitte: Brigitte,
    brigitteIcon: (
        <div className={`w-[200px] m-auto mt-20 mr-1`} title="test">
           <img src={`${Brigitte}`} />
        </div>
    ),
    cassidy: Cassidy,
    cassidyIcon: (
        <div className={`w-[200px] m-auto mt-20 mr-1`} title="test">
           <img src={`${Cassidy}`} />
        </div>
    ),
    'd.va': Dva,
    'd.vaIcon': (
        <div className="flex justify-center items-center pt-14">
            <img src={Dva}  width="100%" className="w-[120px]"/>
        </div>
    ),
    doomfist: Doomfist,
    doomfistIcon: (
        <div className={`w-[190px] m-auto mt-20`} title="test">
           <img src={`${Doomfist}`} />
        </div>
    ),
    echo: Echo,
    echoIcon: (
        <div className={`w-[180px] m-auto mt-20`} title="test">
           <img src={`${Echo}`} />
        </div>
    ),
    genji: Genji,
    genjiIcon: (
        <div className={`w-[150px] m-auto mt-24`} title="test">
           <img src={`${Genji}`} />
        </div>
    ),
    genjiBg: {
        width: '100%',
    },
    illari: Illari,
    illariIcon: (
        <div className={`w-[275px] m-auto mt-24 pr-24`} title="test">
           <img src={`${Illari}`} />
        </div>
    ),
    'junker queen': Junker_Queen,
    'junker queenIcon': (
        <div className={`w-[190px] m-auto mt-20`} title="test">
           <img src={`${Junker_Queen}`} />
        </div>
    ),
    junkrat: Junkrat,
    kiriko: Kiriko,
    kirikoIcon: (
        <div className={`w-[275px] m-auto mt-20 pl-8`} title="test">
           <img src={`${Kiriko}`} />
        </div>
    ),
    lifeweaver: Lifeweaver,
    lifeweaverIcon: (
        <div className={`w-[200px] m-auto mt-14 ml-1`} title="test">
           <img src={`${Lifeweaver}`} />
        </div>
    ),
    lucio: Lucio,
    lucioIcon: (
        <div className={`w-[150px] m-auto mt-20 pr-1`} title="test">
           <img src={`${Lucio}`} />
        </div>
    ),
    mauga: Mauga,
    maugaBg: {
        style: {    
            marginTop: '25%'
        },
    },
    mei: Mei,
    meiIcon: (
        <div className={`w-[150px] m-auto mt-24`} title="test">
           <img src={`${Mei}`} />
        </div>
    ),
    mercy: Mercy,
    mercyIcon: (
        <div className={`w-[225px] m-auto mt-24 pl-16`}>
           <img src={`${Mercy}`} />
        </div>
    ),
    moira: Moira,
    moiraIcon: (
        <div className={`w-[225px] m-auto mt-20`}>
           <img src={`${Moira}`} />
        </div>
    ),
    orisa: Orisa,
    pharah: Pharah,
    pharahIcon: (
        <div className={`w-[200px] m-auto mt-24 mr-1`}>
           <img src={`${Pharah}`} />
        </div>
    ),
    ramattra: Ramattra,
    ramattraIcon: (
        <div className={`w-[200px] m-auto mt-16`}>
           <img src={`${Ramattra}`} />
        </div>
    ),
    reaper: Reaper,
    reaperIcon: (
        <div className={`w-[200px] m-auto mt-20`}>
           <img src={`${Reaper}`} />
        </div>
    ),
    reinhardt: Reinhardt,
    reinhardtIcon: (
        <div className={`w-[175px] m-auto mt-24`}>
           <img src={`${Reinhardt}`} />
        </div>
    ),
    roadhog: Roadhog,
    sigma: Sigma,
    sojourn: Sojourn,
    sojournIcon: (
        <div className={`w-[140px] m-auto mt-24 pl-4`}>
           <img src={`${Sojourn}`} />
        </div>
    ),
    'soldier: 76': Soldier76,
    sombra: Sombra,
    sombraIcon: (
        <div className={`w-[180px] m-auto mt-24 pl-8`}>
           <img src={`${Sombra}`} />
        </div>
    ),
    symmetra: Symmetra,
    symmetraIcon: (
        <div className={`w-[100px] m-auto mt-24`}>
           <img src={`${Symmetra}`} />
        </div>
    ),
    torbjorn: Torbjorn,
    torbjornIcon: (
        <div className={`w-[150px] m-auto mt-10`}>
           <img src={`${Torbjorn}`} />
        </div>
    ),
    tracer: Tracer,
    tracerIcon: (
        <div className={`w-[100px] m-auto mt-24`}>
           <img src={`${Tracer}`} />
        </div>
    ),
    venture: Venture,
    widowmaker: Widowmaker,
    widowmakerIcon: (
        <div className={`w-[225px] m-auto mt-24 pl-8`}>
           <img src={`${Widowmaker}`} />
        </div>
    ),
    winston: Winston,
    winstonIcon: (
        <div className={`w-[100px] m-auto mt-20`}>
           <img src={`${Winston}`} />
        </div>
    ),
    'wrecking ball': WreckingBall,
    zarya: Zarya,
    zenyatta: Zenyatta,
    zenyattaIcon: (
        <div className={`w-[225px] m-auto mt-16 ml-1`}>
           <img src={`${Zenyatta}`} />
        </div>
    ),
}