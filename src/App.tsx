import './App.scss'

import React, { Component, ChangeEvent } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Offcanvas from 'react-bootstrap/Offcanvas'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner';

import { Info } from "./Info"

import Speech from 'speak-tts'

import lsystem from "./lsystem.js"
import parser from "./grammar.js"

import Markov from 'js-markov'

import superstring from "./superstring"

import * as webllm from "@mlc-ai/web-llm";

const modes = [
    { name: 'methods', value: 'methods' },
    { name: 'markov', value: 'markov' },
    { name: 'language model', value: 'llm' },
    { name: 'l-system', value: 'lsystem' },
    { name: 'grammar', value: 'grammar' },
]

interface IExample {
    title: string
    content: string
}

const examples: { [id: string] : IExample[]} = {
    "llm": [
        {title: "poem", content: "write a poem"},
        {title: "poem 2", content: "write a funny poem"},
        {title: "poem 3", content: "write a sad poem in spanish"},
        {title: "poem 4", content: "write a crazy poem by using only numbers and uppercase letters"},
        {title: "poem 5", content: "write an experimental poem titled 'neverland'"},
        {title: "poem 6", content: "write a nasty poem titled 'hurribly'"},
    ],
    "methods": [
    ],
    "markov": [
        {title: "wordsworth", content: "I wandered lonely as a cloud\nThat floats on high o'er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;\nBeside the lake, beneath the trees,\nFluttering and dancing in the breeze.\n\nContinuous as the stars that shine\nAnd twinkle on the milky way,\nThey stretched in never-ending line\nAlong the margin of a bay:\nTen thousand saw I at a glance,\nTossing their heads in sprightly dance.\n\nThe waves beside them danced; but they\nOut-did the sparkling waves in glee:\nA poet could not but be gay,\nIn such a jocund company:\nI gazed—and gazed—but little thought\nWhat wealth the show to me had brought:\n\nFor oft, when on my couch I lie\nIn vacant or in pensive mood,\nThey flash upon that inward eye\nWhich is the bliss of solitude;\nAnd then my heart with pleasure fills,\nAnd dances with the daffodils."},
        {title: "words", content: "a\nabout\nabove\nacross\nact\nactive\nactivity\nadd\nafraid\nafter\nagain\nage\nago\nagree\nair\nall\nalone\nalong\nalready\nalways\nam\namount\nan\nand\nangry\nanother\nanswer\nany\nanyone\nanything\nanytime\nappear\napple\nare\narea\narm\narmy\naround\narrive\nart\nas\nask\nat\nattack\naunt\nautumn\naway\nbaby\nbase\nback\nbad\nbag\nball\nbank\nbasket\nbath\nbe\nbean\nbear\nbeautiful\nbeer\nbed\nbedroom\nbehave\nbefore\nbegin\nbehind\nbell\nbelow\nbesides\nbest\nbetter\nbetween\nbig\nbird\nbirth\nbirthday\nbit\nbite\nblack\nbleed\nblock\nblood\nblow\nblue\nboard\nboat\nbody\nboil\nbone\nbook\nborder\nborn\nborrow\nboth\nbottle\nbottom\nbowl\nbox\nboy\nbranch\nbrave\nbread\nbreak\nbreakfast\nbreathe\nbridge\nbright\nbring\nbrother\nbrown\nbrush\nbuild\nburn\nbusiness\nbus\nbusy\nbut\nbuy\nby\ncake\ncall\ncan\ncandle\ncap\ncar\ncard\ncare\ncareful\ncareless\ncarry\ncase\ncat\ncatch\ncentral\ncentury\ncertain\nchair\nchance\nchange\nchase\ncheap\ncheese\nchicken\nchild\nchildren\nchocolate\nchoice\nchoose\ncircle\ncity\nclass\nclever\nclean\nclear\nclimb\nclock\ncloth\nclothes\ncloud\ncloudy\nclose\ncoffee\ncoat\ncoin\ncold\ncollect\ncolour\ncomb\ncomfortable\ncommon\ncompare\ncome\ncomplete\ncomputer\ncondition\ncontinue\ncontrol\ncook\ncool\ncopper\ncorn\ncorner\ncorrect\ncost\ncontain\ncount\ncountry\ncourse\ncover\ncrash\ncross\ncry\ncup\ncupboard\ncut\ndance\ndangerous\ndark\ndaughter\nday\ndead\ndecide\ndecrease\ndeep\ndeer\ndepend\ndesk\ndestroy\ndevelop\ndie\ndifferent\ndifficult\ndinner\ndirection\ndirty\ndiscover\ndish\ndirection\ndo\ndog\ndoor\ndouble\ndown\ndraw\ndream\ndress\ndrink\ndrive\ndrop\ndry\nduck\ndust\nduty\neach\near\nearly\nearn\nearth\neast\neasy\neat\neducation\neffect\negg\neight\neither\nelectric\nelephant\nelse\nempty\nend\nenemy\nenjoy\nenough\nenter\nequal\nentrance\nescape\neven\nevening\nevent\never\nevery\neveryone\nexact\neverybody\nexamination\nexample\nexcept\nexcited\nexercise\nexpect\nexpensive\nexplain\nextremely\neye\nface\nfact\nfail\nfall\nfalse\nfamily\nfamous\nfar\nfarm\nfather\nfast\nfat\nfault\nfear\nfeed\nfeel\nfemale\nfever\nfew\nfight\nfill\nfilm\nfind\nfine\nfinger\nfinish\nfire\nfirst\nfit\nfive\nfix\nflag\nflat\nfloat\nfloor\nflour\nflower\nfly\nfold\nfood\nfool\nfoot\nfootball\nfor\nforce\nforeign\nforest\nforget\nforgive\nfork\nform\nfox\nfour\nfree\nfreedom\nfreeze\nfresh\nfriend\nfriendly\nfrom\nfront\nfruit\nfull\nfun\nfunny\nfurniture\nfurther\nfuture\ngame\ngarden\ngate\ngeneral\ngentleman\nget\ngift\ngive\nglad\nglass\ngo\ngoat\ngod\ngold\ngood\ngoodbye\ngrandfather\ngrandmother\ngrass\ngrave\ngreat\ngreen\ngrey\nground\ngroup\ngrow\ngun\nhair\nhalf\nhall\nhammer\nhand\nhappen\nhappy\nhard\nhat\nhate\nhave\nhe\nhead\nhealthy\nhear\nheavy\nhello\nhelp\nheart\nheaven\nheight\nhelp\nhen\nher\nhere\nhers\nhide\nhigh\nhill\nhim\nhis\nhit\nhobby\nhold\nhole\nholiday\nhome\nhope\nhorse\nhospital\nhot\nhotel\nhouse\nhow\nhundred\nhungry\nhour\nhurry\nhusband\nhurt\nI\nice\nidea\nif\nimportant\nin\nincrease\ninside\ninto\nintroduce\ninvent\niron\ninvite\nis\nisland\nit\nits\njelly\njob\njoin\njuice\njump\njust\nkeep\nkey\nkill\nkind\nking\nkitchen\nknee\nknife\nknock\nknow\nladder\nlady\nlamp\nland\nlarge\nlast\nlate\nlately\nlaugh\nlazy\nlead\nleaf\nlearn\nleave\nleg\nleft\nlend\nlength\nless\nlesson\nlet\nletter\nlibrary\nlie\nlife\nlight\nlike\nlion\nlip\nlist\nlisten\nlittle\nlive\nlock\nlonely\nlong\nlook\nlose\nlot\nlove\nlow\nlower\nluck\nmachine\nmain\nmake\nmale\nman\nmany\nmap\nmark\nmarket\nmarry\nmatter\nmay\nme\nmeal\nmean\nmeasure\nmeat\nmedicine\nmeet\nmember\nmention\nmethod\nmiddle\nmilk\nmillion\nmind\nminute\nmiss\nmistake\nmix\nmodel\nmodern\nmoment\nmoney\nmonkey\nmonth\nmoon\nmore\nmorning\nmost\nmother\nmountain\nmouth\nmove\nmuch\nmusic\nmust\nmy\nname\nnarrow\nnation\nnature\nnear\nnearly\nneck\nneed\nneedle\nneighbour\nneither\nnet\nnever\nnew\nnews\nnewspaper\nnext\nnice\nnight\nnine\nno\nnoble\nnoise\nnone\nnor\nnorth\nnose\nnot\nnothing\nnotice\nnow\nnumber\nobey\nobject\nocean\nof\noff\noffer\noffice\noften\noil\nold\non\none\nonly\nopen\nopposite\nor\norange\norder\nother\nour\nout\noutside\nover\nown\npage\npain\npaint\npair\npan\npaper\nparent\npark\npart\npartner\nparty\npass\npast\npath\npay\npeace\npen\npencil\npeople\npepper\nper\nperfect\nperiod\nperson\npetrol\nphotograph\npiano\npick\npicture\npiece\npig\npin\npink\nplace\nplane\nplant\nplastic\nplate\nplay\nplease\npleased\nplenty\npocket\npoint\npoison\npolice\npolite\npool\npoor\npopular\nposition\npossible\npotato\npour\npower\npresent\npress\npretty\nprevent\nprice\nprince\nprison\nprivate\nprize\nprobably\nproblem\nproduce\npromise\nproper\nprotect\nprovide\npublic\npull\npunish\npupil\npush\nput\nqueen\nquestion\nquick\nquiet\nquite\nradio\nrain\nrainy\nraise\nreach\nread\nready\nreal\nreally\nreceive\nrecord\nred\nremember\nremind\nremove\nrent\nrepair\nrepeat\nreply\nreport\nrest\nrestaurant\nresult\nreturn\nrice\nrich\nride\nright\nring\nrise\nroad\nrob\nrock\nroom\nround\nrubber\nrude\nrule\nruler\nrun\nrush\nsad\nsafe\nsail\nsalt\nsame\nsand\nsave\nsay\nschool\nscience\nscissors\nsearch\nseat\nsecond\nsee\nseem\nsell\nsend\nsentence\nserve\nseven\nseveral\nsex\nshade\nshadow\nshake\nshape\nshare\nsharp\nshe\nsheep\nsheet\nshelf\nshine\nship\nshirt\nshoe\nshoot\nshop\nshort\nshould\nshoulder\nshout\nshow\nsick\nside\nsignal\nsilence\nsilly\nsilver\nsimilar\nsimple\nsingle\nsince\nsing\nsink\nsister\nsit\nsix\nsize\nskill\nskin\nskirt\nsky\nsleep\nslip\nslow\nsmoke\nsmall\nsmell\nsmile\nsmoke\nsnow\nso\nsoap\nsock\nsoft\nsome\nsomeone\nsomething\nsometimes\nson\nsoon\nsorry\nsound\nsoup\nsouth\nspace\nspeak\nspecial\nspeed\nspell\nspend\nspoon\nsport\nspread\nspring\nsquare\nstamp\nstand\nstar\nstart\nstation\nstay\nsteal\nsteam\nstep\nstill\nstomach\nstone\nstop\nstore\nstorm\nstory\nstrange\nstreet\nstrong\nstructure\nstudent\nstudy\nstupid\nsubject\nsubstance\nsuccessful\nsuch\nsudden\nsugar\nsuitable\nsummer\nsun\nsunny\nsupport\nsure\nsurprise\nsweet\nswim\nsword\ntable\ntake\ntalk\ntall\ntaste\ntaxi\ntea\nteach\nteam\ntear\ntelephone\ntelevision\ntell\nten\ntennis\nterrible\ntest\nthan\nthat\nthe\ntheir\nthen\nthere\ntherefore\nthese\nthick\nthin\nthing\nthink\nthird\nthis\nthough\nthreat\nthree\ntidy\ntie\ntitle\nto\ntoday\ntoe\ntogether\ntomorrow\ntonight\ntoo\ntool\ntooth\ntop\ntotal\ntouch\ntown\ntrain\ntram\ntravel\ntree\ntrouble\ntrue\ntrust\ntwice\ntry\nturn\ntype\nuncle\nunder\nunderstand\nunit\nuntil\nup\nuse\nuseful\nusual\nusually\nvegetable\nvery\nvillage\nvoice\nvisit\nwait\nwake\nwalk\nwant\nwarm\nwash\nwaste\nwatch\nwater\nway\nwe\nweak\nwear\nweather\nwedding\nweek\nweight\nwelcome\nwell\nwest\nwet\nwhat\nwheel\nwhen\nwhere\nwhich\nwhile\nwhite\nwho\nwhy\nwide\nwife\nwild\nwill\nwin\nwind\nwindow\nwine\nwinter\nwire\nwise\nwish\nwith\nwithout\nwoman\nwonder\nword\nwork\nworld\nworry\nworry\nworst\nwrite\nwrong\nyear\nyes\nyesterday\nyet\nyou\nyoung\nyour\nzero\n"},
        {title: "genesis-en", content: "In the beginning, God created the heavens and the earth. The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.\n\nAnd God said, “Let there be light,” and there was light. And God saw that the light was good. And God separated the light from the darkness. God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day.\n\nAnd God said, “Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.” And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse. And it was so. And God called the expanse Heaven. And there was evening and there was morning, the second day.\n\nAnd God said, “Let the waters under the heavens be gathered together into one place, and let the dry land appear.” And it was so. God called the dry land Earth, and the waters that were gathered together he called Seas. And God saw that it was good.\n\nAnd God said, “Let the earth sprout vegetation, plants yielding seed, and fruit trees bearing fruit in which is their seed, each according to its kind, on the earth.” And it was so. The earth brought forth vegetation, plants yielding seed according to their own kinds, and trees bearing fruit in which is their seed, each according to its kind. And God saw that it was good. And there was evening and there was morning, the third day.\n\nAnd God said, “Let there be lights in the expanse of the heavens to separate the day from the night. And let them be for signs and for seasons, and for days and years, and let them be lights in the expanse of the heavens to give light upon the earth.” And it was so. And God made the two great lights—the greater light to rule the day and the lesser light to rule the night—and the stars. And God set them in the expanse of the heavens to give light on the earth, to rule over the day and over the night, and to separate the light from the darkness. And God saw that it was good. And there was evening and there was morning, the fourth day.\n\nAnd God said, “Let the waters swarm with swarms of living creatures, and let birds fly above the earth across the expanse of the heavens.” So God created the great sea creatures and every living creature that moves, with which the waters swarm, according to their kinds, and every winged bird according to its kind. And God saw that it was good. And God blessed them, saying, “Be fruitful and multiply and fill the waters in the seas, and let birds multiply on the earth.” And there was evening and there was morning, the fifth day.\n\nAnd God said, “Let the earth bring forth living creatures according to their kinds—livestock and creeping things and beasts of the earth according to their kinds.” And it was so. And God made the beasts of the earth according to their kinds and the livestock according to their kinds, and everything that creeps on the ground according to its kind. And God saw that it was good.\n\nThen God said, “Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and over the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth.”\n\nSo God created man in his own image, in the image of God he created him; male and female he created them.\nAnd God blessed them. And God said to them, “Be fruitful and multiply and fill the earth and subdue it, and have dominion over the fish of the sea and over the birds of the heavens and over every living thing that moves on the earth.” And God said, “Behold, I have given you every plant yielding seed that is on the face of all the earth, and every tree with seed in its fruit. You shall have them for food. And to every beast of the earth and to every bird of the heavens and to everything that creeps on the earth, everything that has the breath of life, I have given every green plant for food.” And it was so. And God saw everything that he had made, and behold, it was very good. And there was evening and there was morning, the sixth day."},
        {title: "abendlied", content: "der mond ist aufgegangen,\ndie goldnen sternlein prangen\nam himmel hell und klar;\nder wald steht schwarz und schweiget,\nund aus den wiesen steiget\nder weiße nebel wunderbar.\n\nwie ist die welt so stille,\nund in der dämmrung hülle\nso traulich und so hold!\nals eine stille kammer,\nwo ihr des tages jammer\nverschlafen und vergessen sollt.\n\nseht ihr den mond dort stehen?\ner ist nur halb zu sehen,\nund ist doch rund und schön!\nso sind wohl manche sachen,\ndie wir getrost belachen,\nweil unsre augen sie nicht sehn.\n\nwir stolze menschenkinder\nsind eitel arme sünder\nund wissen gar nicht viel;\nwir spinnen luftgespinste\nund suchen viele künste\nund kommen weiter von dem ziel.\n\ngott, laß uns dein heil schauen,\nauf nichts vergänglichs trauen,\nnicht eitelkeit uns freun!\nlaß uns einfältig werden\nund vor dir hier auf erden\nwie kinder fromm und fröhlich sein!\n\nwollst endlich sonder grämen\naus dieser welt uns nehmen\ndurch einen sanften tod!\nund, wenn du uns genommen,\nlaß uns in himmel kommen,\ndu unser herr und unser gott!\n\nso legt euch denn, ihr brüder,\nin gottes namen nieder;\nkalt ist der abendhauch.\nverschon uns, gott! mit strafen,\nund laß uns ruhig schlafen!\nund unsern kranken nachbar auch!\n"},
        {title: "wörter", content: "abgekratzter\nabkoche\nabgefülltem\nabgaskanals\nadmiralsgattin\nabbildungsabschnitts\nabstimmfrequenzen\nabreist\nabstrahlend\nabzuhörende\nachtflächner\nabsprunggeschwindigkeiten\nabgenabelten\nabwasseraufbereitung\nabfertigungsleitern\nabkürzen\nabfindungsanspruches\nablageschränke\nablaufgerüsten\nabzäunend\nabmahnten\nabtrat\nabrechnungsroutinen\nabenteuerpfades\nabzusehende\nachtzehnter\nabenteuerurlauben\nabfallhalde\nabzupellen\nabgebuchte\nabzulaichen\nabschussvariante\nabbekommens\nabgekratzten\nadmiralstabschefs\nablötender\nabschnittszahl\nachtzehnstöckigem\nabgrund\nabputzenden\nabkürzungserläuterung\nabschlussfigur\nafghanen\nabklaubtest\nabsolutzahlen\nabrollgewichtes\nachtsilbe\nabschreibungsliste\nabsatztheorie\nabwehrreihen\nabtrennung\nackerkommissionen\nabstoppst\nabmontierendes\nackerbausysteme\nabsicherungsmitteln\nabfahrtsrennen\nachtsitzig\nabrunden\nabwurftests\nabstiegskonkurrenten\nadelsporträts\nabhöre\nabsatzkampf\naberwitziger\nabsturzstelle\nabstößen\nabschlusstrakten\nackerlosem\nabzahlungsdarlehen\nabgestaubten\nabflauend\nabfallwirtschaftsverbandes\nabsatztrennung\nabflussrohrs\nabzuklopfenden\nabenteuerurlauberin\nabpasst\nabkratzen\nabzeichnenden\naffenstunde\nabfertigungsposition\nabkürzungswörterbüchern\nabrüstungsangeboten\nabschreibungsrücklage\nabwicklungsbank\nadressabgleich\naberwitzigen\nafghane\nabgetretenen\nabmildre\naffenstalles\nabgekämpft\nableitungsterms\nabgefeuertem\naddierbefehle\nabwiegelnder\nabteilungsgefügen\nadditiven\nabgeschmirgelte\nabspülen\nabziehwerkzeugs\nabschiedsfete\nabwehrkämpfen\nabspieldrehzahl\nableseverfahren\nabtransportierbarer\nadoptiertest\nabgekoppelt\nabzugsfähigkeiten\nabflussmittels\nabstellkapazität\nabstrahlrichtung\nadministrationstool\nabschaltspannung\nabgrenzungsstrukturen\nabbruchfalls\nabseitsregeln\nabdominallinie\nableitungssystemen\nabnutzungsgefechte\nabarbeitendes\nabsicherungsformen\nabgasbeheizt\nadressermittlung\nabdampfflut\nabtasteinheiten\nabzuwirtschaftende\nabbruchmaske\nablassventil\nabdruckes\nabriebvorgang\nabflugplan\nadjunktor\nadressensuchdienstes\nabschalttermins\nablaufprozesse\nabgezockten\nabaxialer\nabzweigdose\nabstandsquadratgesetze\nabnutzungspigment\nabtastsignals\nabbaugeräuschen\nabgabenbelastungen\nabspülst\nachtarmigen\nabrissgeschwindigkeiten\nabfertigungsvorschrift\nabendländisch\nabendnetz\nabbildungsnotationen\nabzulegen\nadlerfanges\nabbaubeschleunigung\nabschrägt\nabfräst\nabwaschendem\nablaufvorgang\nachselstück\nabspielmethoden\nabstoppte\nabzuhören\nadressendienst\nablieferten\nabgestützter\nabfärbendem\nabwehrfähigkeit\nabgehängtes\nabwehrfahrzeugs\nadapterringen\nabzuleitendem\nabziehbarer\nacrylkronen\nabgeflauter\nabsahnpolitik\nabgeschlagenem\nabfüllbetrieben\naberration\nablenkbar\nabgeschattete\nabendgage\nabhörqualität\nabbaumaschine\nadministrationssystems\nackerbaubetrieb\nabgefressener\nabgeschlepptes\nabgezählten\nabgespannteres\nabschalttemperatur\nabgebaggert\nablaufverfolgungsprogrammen\nabwärtskompatiblem\nabrichtwerkzeuge\nabgemurkst\naffensteinen\nabreißkante\nablenkgeschwindigkeit\nachterpacks\nabzugskapitals\nablieferungsauflage\nabtreibungslager\nabwesenheitsprozessen\nabrechnungsverbindlichkeit\nabflussgewässern\nafghanisch\nabgrenzungsvereinbarung\nabzahlten\nabfallschublade\nabrissen\nabfertigungsleiter\nabschert\nabgehäutete\nabschreckungskonzepten\nachsträger\nabendhauch\nabseitstors\nachtsaitiges\nachtstelliges\nabsatzanteils\nabfangjagd\nableitungsbegriffs\nadäquatem\nabschirmleiter\nabbruchkrans\nabhängigkeitspotenzial\nachsstellung\nabspielprogramms\nabsicherungsmaßnahme\nabgeordnetenhauswahlen\nabknöpftest\nabzufindende\nabbauleitzentrale\nabsorptionsminimums\nactionelemente\nabmarschierens\nabstinenzgebote\nabgeordnetenliste\nabspanntextes\nabfallbeseitigungsgesetz\nabgebrachte\nabgewürgtes\nabnahmezeugnissen\nadditionsworten\nabonnierbar\nabgedrehtem\nabsetzraum\nachsellymphgefäße\nabwasserkonzepts\nachtsemestrige\nabwehrmechanismus\nabgesägten\nabzutreibendes\nabrichtanschlages\nabstimmungsbereich\nabkürzungsteile\nabstiegsreife\nachsdifferentialen\nachsenbau\nackermaß\nabsatzgliederungen\nabblendbarer\nabstellhebeln\nabwaschwassers\nabblockendem\nabtratest\nabgabenstrafverfahren\nachsenwinkel\nabschlusszugabe\nachsausrichtung\naberntend\nabschaltpunktes\nachterbahnzug\nabrollbergs\nabgabefreier\nabspiegelnde\nabdruckspur\nabonnementvertrages\nabstimmungshinweisen\nabschreibungsparameters\nachtens\nabschiedsbrief\nadlerhaupt\nadressensysteme\nabzudeckende\nabgequälten\nabgerupfte\nabsperrorganen\nabwurfdächern\nabnahmesysteme\nabfüllfilialen\nabriegelungen\nabrüstungskomitees\nabstraktionsprinzipien\nabschlusssatz\nabzuzappeln\nabzuschneidender\naderisolierung\nablösend\nabbaurate\nabzuwehren\nabtsstühle\nabfallprodukts\nabwickelndes\nabnormale\nadriger\nabschlussreferate\nabwärtstransporten\nabflussreinigern\nabwehrprojekten\nabgeguckt\nabzugssystems\nabspenstige\nabschlussnomenklaturen\nabstiegssorgen\nachtelfinalspiele\nabsorptionskühlschrank\nabsehens\nabgesangs\nachtundvierzig\nabbruchsiege\nabzahlungssysteme\nabbröckelnden\nacrylharzes\nabstrahierend\nabstammungsnachweises\nabzuklauben\nabgeglittenem\nabgeschmetterter\nabgenützter\nabschleppvorgang\nablaufleistungen\nabriebvorganges\nabteilbarer\nachterbereich\nachteten\nabgezirkelt\nabhängigkeitserfahrung\nabdrosselndem\nadlerflugs\nachtundzwanzigfacher\nabwanderungsbereitschaft\nabenteuersucht\nabdominalorgans\nabwirtschaften\nabsteppender\nadressenfreigaben\nabwandert\nablasshilfen\nabnormalere\nabwesenheitsprozesse\nachtbaren\nabenteuerformates\nabzusonderndes\nabdankende\nabnahm\nabwicklungssysteme\nabschlussquote\nabstandszahlungen\nabarbeitungsgeschwindigkeiten\naffären\naffenkultur\naffenstil\nadministrationsbereich\nabgeschlachteten\nabschließenden\nabwertungslandes\nablaufrechners\nabbindest\nadressendienste\nablasspraxis\nabrate\nabwehrgeschützen\nabenteuerreichem\nabschreibungsstichtag\nabstimmkreises\nabkürzungswegen\nabstimmungsverluste\naffektbrücken\nableitungsmaschinen\nabnutzungsanzeigers\nabänderungsbedürftiges\nabstrampelns\nablötetet\nachterschläge\nabgeheilter\nabbildungslösung\nabzäuntet\nabtakelnder\nabsetzapparat\nabschlachtenden\nabsolviert\nabfragegeräten\nabgewetzten\nablagepunkte\nachterbecke\nabkratzen\nabgangsballistik\nadventswassers\nachteckseiten\nabgabezeitpunkte\nadressleisten\nabzublockendes\nabschreckungsfunktion\nabgespritztem\nabbauregion\nabdeckdrucke\nabfallproblematik\nabbrandoberflächen\naffekterzeugung\nabschicktet\nabgekratztem\nabdichten\nabfülltechnologien\nabschmiertet\nabblendscheinwerfern\nabfahrtsweltmeistertitel\nabkoppelnder\nabgezäuntes\nabgenommen\nachsenwechsel\nabbaurevieren\nadelstraktate\nabdrosseltet\nabtastmechanismen\nabkürzungsorgien\naceton\nadressierend\nabschlussposition\nabsetzbecken\nabergläubischster\nablaufsteuerwerke\nabbruchfalls\näffe\nadoptionen\nadaptivem\nabtropfenden\nabreist\nadelst\nackern\nabbaugeräten\nabrissreifes\nabbuchungssystems\nadelsfraktionen\nadelstage\nadelsrechts\nabwegigeres\nabhobelnde\nabwasserkreislauf\nabkuppelten\nabschrauben\nadressspeichers\nabfaulender\nactionregisseurin\nabtropfen\nabstreichend\nabhinge\nabzugleichender\nabschlecke\nabfangbewaffnung\nabseitsstehen\nadressseite\nabbruchreaktion\nabzutastender\nabgeheiltes\nabwälzung\nadressblöcken\nabgeordnetenhauswahlkreisen\nabwurflinie\nabdampfte\nadlerschnäbeln\nadministrationsministern\nackerrechte\nadelsgeschichte\nabstiegsbedrohter\naddiervorrichtungen\nabwehrfähigkeit\nabzuspülen\nabschleifenden\nabarbeitende\nabschwellend\nabneigungen\nabsurderen\nabziehbare\nabspanntest\nabquältet\nabriebfestem\nabzuringende\nabschneidefunktion\nabstaubenden\nabstrusitäten\nabflog\nadressmarkierungen\nabgeschätztem\nabbrechers\nabgebüßtes\nabhörschnittstelle\nabschlussveranstaltungen\nabgeordnetenwahl\nabtastpositionen\nabfertigungsgruppen\nabklingkurven\nabtrennenden\nabzustecken\nabschneidens\nabfahrtstagen\nabziehplakat\nableitungsversuch\nabflussquerschnitten\nabbindeverhaltens\nabschlussventilventil\nabschaltgeschwindigkeit\nadventistischem\nabsorptionssystems\nabfangjäger\nabtippt\nabgebrachten\nacrylbeschichtung\nachtermann\nabgemindertem\nabstimmungswillen\nabwärtsfahrt\nachtzigster\nabgenäht\nabfülle\nabgasentgiftungen\nabliefern\nabgeplagter\nabzuwerten\nadaption\nadventivwurzeln\nabzweiggleis\nabflussgittern\nachtsamkeit\nabbaubereiche\nabstandsrohre\nabschwenktet\naffektwirkung\nabsatzprozesses\nabbrennen\nabzweigklemme\nabgestattetem\nablehnungsbescheiden\nabflaute\nabbrausend\nabdeckhüllen\nabklingcharakteristik\nabwasserreinigung\nabschiedsworts\n"},
        {title: "genesis-de", content: "Im Anfang war das Wort, und das Wort war bei Gott, und das Wort war Gott. Im Anfang war es bei Gott. Alles ist durch das Wort geworden und ohne das Wort wurde nichts, was geworden ist. In ihm war das Leben und das Leben war das Licht der Menschen. Und das Licht leuchtet in der Finsternis und die Finsternis hat es nicht erfasst. Es trat ein Mensch auf, der von Gott gesandt war; sein Name war Johannes. Er kam als Zeuge, um Zeugnis abzulegen für das Licht, damit alle durch ihn zum Glauben kommen. Er war nicht selbst das Licht, er sollte nur Zeugnis ablegen für das Licht. Das wahre Licht, das jeden Menschen erleuchtet, kam in die Welt. Er war in der Welt und die Welt ist durch ihn geworden, aber die Welt erkannte ihn nicht. Er kam in sein Eigentum, aber die Seinen nahmen ihn nicht auf. Allen aber, die ihn aufnahmen, gab er Macht, Kinder Gottes zu werden, allen, die an seinen Namen glauben, die nicht aus dem Blut, nicht aus dem Willen des Fleisches, nicht aus dem Willen des Mannes, sondern aus Gott geboren sind. Und das Wort ist Fleisch geworden und hat unter uns gewohnt und wir haben seine Herrlichkeit gesehen, die Herrlichkeit des einzigen Sohnes vom Vater, voll Gnade und Wahrheit. Johannes legte Zeugnis für ihn ab und rief: Dieser war es, über den ich gesagt habe: Er, der nach mir kommt, ist mir voraus, weil er vor mir war. Aus seiner Fülle haben wir alle empfangen, Gnade über Gnade. Denn das Gesetz wurde durch Mose gegeben, die Gnade und die Wahrheit kamen durch Jesus Christus. Niemand hat Gott je gesehen. Der Einzige, der Gott ist und am Herzen des Vaters ruht, er hat Kunde gebracht."},
    ],
    "lsystem": [
        {title: "b-language", content: "# b-language\na = aba;\ne = ebe;\ni = ibi;\no = obo;\nu = ubu;\ny = yby;\nä = äbä;\nö = öbö;\nü = übü;"},
        {title: "buchstabieralphabet", content: "# österreichisches buchstabieralphabet\na = anton ;\nb = berta ;\nc = cäsar ;\nd = dora ;\ne = emil ;\nf = friedrich ;\ng = gustav ;\nh = heinrich ;\ni = ida ;\nj = julius ;\nk = konrad ;\nl = ludwig ;\nm = martha ;\nn = nordpol ;\no = otto ;\np = paula ;\nq = quelle ;\nr = richard ;\ns = samuel ;\nt = theodor ;\nu = ulrich ;\nv = viktor ;\nw = wilhelm ;\nx = xaver ;\ny = ypsilon ;\nz = zeppelin ;\nä = ärger ;\nö = ökonom ;\nü = übermut ;\nß = scharfes s ;"},
        {title: "rhythm 1", content: "# rhythm 1 - start with s\ns = ska;\nt = atts;\nk = kakap;\np = kpki kik po po;\no = op rop po;"},
        {title: "rhythm 2", content: "# rhythm 2 - start with l\nl = lü;\nü = ülüm;\nm = ilimmi;\ni = linnih;\nh = heumü;\n"},
        {title: "rhythm 3", content: "# rhythm 3 - start with i\ni = ix;\nx = xixa;\na = aksi;\nk = kassik;\n"},
        {title: "rhythm 4", content: "# rhythm 4 - start with a\na = aaif;\ni = iof;\no = oaouf;\nu = ufuue;\ne = effei;\n"},
    ],
    "grammar": [
        {title: "tutorial 1", content: "# tutorial 1\nSTART = begin; # a START symbol is always needed\n# don't forget the semicolon ; at the end of each line\n"},
        {title: "tutorial 2", content: "# tutorial 2\nSTART = SECOND; # a START symbol is always needed\nSECOND = all words written only in capital letters (and numbers) are substitued by their definition;\n"},
        {title: "tutorial 3", content: "# tutorial 3\nSTART = EITHER | OR; # symbols separated by | are chosen randomly, try it a couple of times\nEITHER = this;\nOR = that;\n"},
        {title: "tutorial 4", content: "# tutorial 4\nSTART = EITHER OR; # symbols separated by a space are joined\nEITHER = this;\nOR = that;\n"},
        {title: "tutorial 5", content: "# tutorial 5\nSTART = FIRST+SECOND; # symbols separated by + are joined without a space\nFIRST = ver;\nSECOND = bindung;"},
        {title: "tutorial 6", content: "# tutorial 6\nSTART = A A A A A A;\nA = but | though| and | too| B;\nB = i | you | he | she | START; # you can use symbols in symbol definitions\n"},
        {title: "tutorial 7", content: "# tutorial 7\nSTART = infinite START; # but don't do this!!!\n"},
        {title: "tempora", content: "START = SATZ.;\n\nSATZ = TEMPPRAES SATZPRAES | TEMPPAST SATZPAST | TEMPFUT SATZFUT;\n\nSATZPRAES = VERBPRAESSING SATZCONTSING | VERBPRAESPLUR SATZCONTPLUR;\nSATZPAST = VERBPASTSING SATZCONTSING | VERBPASTPLUR SATZCONTPLUR;\nSATZFUT = VERBFUTSING1 SATZCONTSING VERBFUTSING2 | VERBFUTPLUR1 SATZCONTPLUR VERBFUTPLUR2;\n\nVERBPRAESSING = ist;\nVERBPRAESPLUR = sind;\n\nVERBPASTSING = war;\nVERBPASTPLUR = waren;\n\nVERBFUTSING1 = wird;\nVERBFUTSING2 = gewesen sein;\nVERBFUTPLUR1 = werden;\nVERBFUTPLUR2 = gewesen sein;\n\nSATZCONTSING = alles besser | nichts wie zuvor | alles vergeblich | alles einerlei | alles schlechter | uns alles einerlei;\nSATZCONTPLUR = wir glücklich | wir unerfahren | wir unvorsichtig | wir übervorsichtig | wir genau | wir entschlossen zu allem;\n\nTEMPPRAES = heute | momentan | jetzt | in diesem moment;\nTEMPPAST = vorgestern | gestern | vor einem jahr | vor einer woche | gerade eben | voriges monat;\nTEMPFUT = morgen | übermorgen | bald | gleich | in einer woche | in einem jahr | in der zukunft | in einem monat;\n"},
        {title: "wittgenstein", content: "START = PARAGRAPH PARAGRAPH PARAGRAPH PARAGRAPHS PARAGRAPHS;\n\nPARAGRAPHS = PARAGRAPH PARAGRAPHS | PARAGRAPH;\nPARAGRAPH = START1 START1 SENTENCES\\n\\n;\nSENTENCES = START1 SENTENCES | START1;\n\nSTART1 = START1A. | START1A. | START1A. | START1A. | PREFIX START1A. | PREFIXQ START1A? | FRAGE;\nSTART1A = SATZ1 | SATZ2 | SATZ3 | SATZ4;\n\nPREFIX    = ich kann mich darin nicht irren: | ich könnte sagen: | wenn ich sagte: | das heisst: | die antwort kann auch sein: | es ist seltsam: | man sagt nicht: | und dennoch: | wir sagen: | ich könnte auch so sagen: | man könnte auch sagen: | es scheint: | das wichtigste ist hier dies:;\nPREFIXQ    = soll ich sagen: | heißt das nun: | ist es falsch, zu sagen:;\n\nSATZ1 = SPTRANS OBJEKT;\nSATZ2 = SPINTRANS;\nSATZ1O2 = SATZ1 | SATZ2;\nSATZ3 = SATZ1O2, CONJ CONDSATZ;\nSATZ4 = wenn CONDSATZ, dann CONDSATZ2;\n\n\nCONDSATZ = CONDSATZTRANS | CONDSATZINTRANS;\nCONDSATZTRANS = SUBJEKTSING OBJEKTSING PREDTRANSSING | SUBJEKTPLUR OBJEKTPLUR PREDTRANSPLUR;\nCONDSATZINTRANS    = SUBJEKTSING PREDINTRANSSING | SUBJEKTPLUR PREDINTRANSPLUR;\n\nCONDSATZ2 = CONDSATZTRANS2 | CONDSATZINTRANS2;\nCONDSATZTRANS2 = PREDTRANSSING SUBJEKTSING OBJEKTSING | PREDTRANSPLUR SUBJEKTPLUR OBJEKTPLUR;\nCONDSATZINTRANS2 = PREDINTRANSSING SUBJEKTSING | PREDINTRANSPLUR SUBJEKTPLUR;\n\nFRAGE = FRAGEPREFIX FRAGE1A | FRAGE1A | FRAGE1A;\nFRAGEPREFIX = man möchte fragen: | frage:;\nFRAGE1A = FRAGEWORT PREDINTRANSSING SUBJEKTSING? | FRAGEWORT PREDINTRANSPLUR SUBJEKTPLUR?;\nFRAGEWORT = was | wie | wo;\n\nSPTRANS = SUBJEKTSING PREDTRANSSING | SUBJEKTPLUR PREDTRANSPLUR;\nSPINTRANS = SUBJEKTSING PREDINTRANSSING | SUBJEKTPLUR PREDINTRANSPLUR;\n\nOBJEKT = OBJEKTSING | OBJEKTPLUR;\n\nARTIKELSINGW = die;\nARTIKELSINGM = der;\nARTIKELSINGN = das;\n\nSUBJEKTSING1W = wahrheit | vorstellung | antwort | frage | negation | sprachverwendung | absicht | erwartung | philosophie | frage;\nSUBJEKTSING1M = satz | verstand | sinn | mensch;\nSUBJEKTSING1N = wort | erkennen | sprachspiel | wissen | experiment;\n\nGENITIVSING1M = satzes | verstandes | sinns | menschens;\nGENITIVSING1N = wortes | erkennens | sprachspiels | wissens | kindes;\n\nGENITIVSING    = der SUBJEKTSING1W | des GENITIVSING1M | des GENITIVSING1N;\n\nADJSINGDET = unzweifelhafte | unbeabsichtigte | zweifelhafte | überprüfte | unfehlbare | zusammenhanglose;\n\nSUBJEKTSING1A = ARTIKELSINGN SUBJEKTSING1N | ARTIKELSINGM SUBJEKTSING1M | ARTIKELSINGW SUBJEKTSING1W;\nSUBJEKTSING1ADJ    = ARTIKELSINGN ADJSINGDET SUBJEKTSING1N | ARTIKELSINGM ADJSINGDET SUBJEKTSING1M | ARTIKELSINGW ADJSINGDET SUBJEKTSING1W;\nSUBJEKTSING = SUBJEKTSING1A | SUBJEKTSING1ADJ | SUBJEKTSING1A GENITIVSING | SUBJEKTSING1ADJ GENITIVSING;\nPREDTRANSSING = sieht | untersucht | teilt | liest;\nPREDINTRANSSING    = spricht | lernt | irrt;\nOBJEKTSING = den satz | mich | den sinn | den zweifel | das spiel | das gedächtnis;\n\nSUBJEKTPLUR1 = gedanken | farben | sätze | antworten | fragen | worte | dinge | fragen;\nSUBJEKTPLUR    = SUBJEKTPLUR1 | ADJPLUR SUBJEKTPLUR1;\nPREDTRANSPLUR = sprechen | lehren | lesen;\nPREDINTRANSPLUR    = sprechen | spielen | beginnen | lernen;\nOBJEKTPLUR = die sätze | die zweifel | die wörter;\n\nADJPLUR = eindeutige | einzigartige | verschiedene | unzweifelhafte | unmittelbare;\n\nCONJ = während | wo | wenn | weshalb | worauf;\n"},
        {title: "rhythm", content: "START = S. S. S. S.;\nS = tri XI | ti XF | dha XH;\nXI = ikt dha tri ikt dha ge na XD | ikt XJ | ikt XG;\nXF = dha XJ | XG;\nXH = ti dha tri ikt XB | tri ikt dha XC;\nXD = dha ti dha ge dhee na ge na;\nXJ = tri ikt XA;\nXG = dha ti XA;\nXB = dha tri ikt XD;\nXC = ti XB | ti dha ti XD | tri ikt dha XE;\nXA = dha XB;\nXE = dha XD | ge XD;\n"},
    ]
}

interface xTXTState {
    statusLabel: string
    mode: string
    text: string
    undoText: string
    sourceText: string
    prefix: number
    showInfo: boolean
    showSettings: boolean
    llmEngine?: webllm.MLCEngineInterface
    generating: boolean
    loading: boolean
    temperature: number
}
 
interface xTXTProps {
}

class App extends Component<xTXTProps, xTXTState> {
    speech: any
    private inputRef: React.RefObject<HTMLTextAreaElement>;
    private sourceRef: React.RefObject<HTMLTextAreaElement>;

    constructor(props: xTXTProps) {
        super(props)

        this.inputRef = React.createRef();
        this.sourceRef = React.createRef();

        this.speech = new Speech()
        this.speech.init({
            'volume': 1,
            'lang': 'de-DE',
            'rate': 1,
            'pitch': 1
        }).then((data: any) => {
            // The "data" object contains the list of available voices and the voice synthesis params
            console.log("Speech is ready, voices are available", data)
        }).catch((e: Error) => {
            console.error("An error occured while initializing : ", e)
        })

        var text = localStorage.getItem("xtxt-text");

        if (text === undefined || text === null) {
            text = "";
        }
        this.state = {
            mode: "methods", 
            statusLabel: "",
            text: text, 
            undoText: "", 
            sourceText:"", 
            prefix: 3,
            showInfo: false,
            showSettings: false,
            llmEngine: undefined, 
            generating: false, 
            loading: false, 
            temperature: 0.7
        }          

        this.speak = this.speak.bind(this)
        this.stopSpeech = this.stopSpeech.bind(this)

        this.handleChange = this.handleChange.bind(this);
        this.handleSourceChange = this.handleSourceChange.bind(this);

        this.applyMarkov = this.applyMarkov.bind(this)
        this.applyGrammar = this.applyGrammar.bind(this)
        this.applyLLM = this.applyLLM.bind(this)
        this.convertGrammar = this.convertGrammar.bind(this)
        this.applyLSystem = this.applyLSystem.bind(this)

        this.undo = this.undo.bind(this)
        this.clear = this.clear.bind(this)

        this.loadModel = this.loadModel.bind(this)
    }

    storeText(text: string) {
        localStorage.setItem("xtxt-text", text);
    }

    handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({text: event.target.value});
        this.storeText(event.target.value);
    }

    handleSourceChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({sourceText: event.target.value});
        this.storeSource(event.target.value);
    }

    speak() {
        this.speech.speak({
            text: this.state.text,
        }).then(() => {
            console.log("Success !")
        }).catch((e: Error) => {
            console.error("An error occurred :", e)
        });
    }

    stopSpeech() {
        window.speechSynthesis.cancel();
    }

    changeText(func: (txt: string) => string) {
        let textVal = this.inputRef.current!
        let cursorStart = textVal.selectionStart!;
        let cursorEnd = textVal.selectionEnd!;

        this.setState({undoText: this.state.text});
        var newText = "";
        if (cursorStart === cursorEnd) { // process whole text
            newText = func(this.state.text);
        }
        else { // process only a part
            let str = func(this.state.text.substring(cursorStart,cursorEnd));

            newText = this.state.text.substring(0, cursorStart)+str+this.state.text.substring(cursorEnd);
        }
        this.setState({text: newText});
        this.storeText(newText);
    }

    changer(func: (txt: string) => string) {
        return () => {
            this.changeText(func)
        }
    }

    setLoading(loa: boolean) {
      this.setState( {loading: loa});
    }

    setStatusLabel(text: string) {
        this.setState({ statusLabel: text });
    }

    async loadLLMModel() {
        const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";

        const initProgressCallback = (report: webllm.InitProgressReport) => {
            this.setStatusLabel(report.text);
        };

        console.log("loading LLM...");

        const engine: webllm.MLCEngineInterface = await webllm.CreateMLCEngine(
            selectedModel,
            {
                initProgressCallback: initProgressCallback,
                logLevel: "INFO", // specify the log level
            },
            // customize kv cache, use either context_window_size or sliding_window_size (with attention sink)
            {
                context_window_size: 2048,
                // sliding_window_size: 1024,
                // attention_sink_size: 4,
            },
        );

        return engine;
        }

        async loadModel() {
        this.setLoading(true);

        this.loadLLMModel().then(engine => {
            console.log("engine:", engine);
            this.setState({ llmEngine: engine });
            this.setLoading(false);
        });
    }

    setGenerating(gen: boolean) {
        this.setState( {generating: gen});
    }

    async generate() {
        try {
            const reply = this.state.llmEngine?.chat.completions.create({
            messages: [{ role: "user", content: this.state.sourceText }],
            // below configurations are all optional
            n: 1,
            temperature: this.state.temperature,
            max_tokens: 256,
            logprobs: true,
            top_logprobs: 2,
            });

            return reply;
        }
        catch (error) {
            console.log(error);
        }
        return null;
    }

    async applyLLM() {
        this.setGenerating(true);

        this.generate().then(reply => {
            console.log("reply:", reply);
            this.setState({text: reply?.choices[0].message.content ?? "an error occured"});
            this.setGenerating(false);
        });
    }

    applyMarkov() {
        this.changeText((txt) => {
            let markovChain = new Markov()
            markovChain.addStates(this.state.sourceText)
            markovChain.train(this.state.prefix)

            return markovChain.generateRandom(1000)
        });
    }

    applyGrammar() {
        this.changeText((txt) => {
            var rules: any;

            try {
                rules = parser.parse(this.state.sourceText)
            }
            catch (e: any) {
                return "ERROR: "+e.name + ': ' + e.message;
            }
            console.log(rules);

            let findRule = (ruleName: string) => {
                for (var r of rules) {
                    if (r.rule === ruleName) {
                        return r.tail;
                    }
                }
                return undefined;
            }

            let expandRule = (ruleName: string) => {
                let ruleTail = findRule(ruleName);

                if (ruleTail === undefined) {
                    return "ERROR: rule "+ruleName+" not found!";
                }

                const randomElement = ruleTail[Math.floor(Math.random() * ruleTail.length)];
                var str = "";
                var concatStr = " ";
                for (var verb of randomElement) {
                    if (verb.type === "symbol") {
                        if (str.length > 0) {
                            str += concatStr;
                        }
                        str += expandRule(verb.text);
                        concatStr = " ";
                    }
                    else if (verb.type === "text") {
                        if (str.length > 0) {
                            str += concatStr;
                        }
                        str += verb.text;
                        concatStr = " ";
                    }
                    else if (verb.type === "punctuation") {
                        str += verb.text;
                        concatStr = " ";
                    }
                    else if (verb.type === "concat") {
                        concatStr = "";
                    }
                }
                return str;
            }

            var result = "";
            try {
                result = expandRule("START");
            }
            catch (e: any) {
                result = "ERROR: "+e.name + ': ' + e.message;
            }
            return result;
        });
    }

    convertGrammar() {
        this.changeText((txt) => {
            var rules: any;
            var output = "";

            try {
                rules = parser.parse(this.state.sourceText)
            }
            catch (e: any) {
                return "ERROR: "+e.name + ': ' + e.message;
            }

            let out = (txt: string) => {
                output += txt;
            }

            let removeComma = (comma: string) => {
                if (output.substring(output.length-comma.length, output.length) === comma) {
                    output = output.substring(0, output.length-comma.length);
                }
            }

            let outTail = (tail: any) => {
                console.log(tail);

                for (let tailAlternative of tail) {
                    out("\"");

                    for (var verb of tailAlternative) {
                        if (verb.type === "symbol") {
                            out("#");
                            out(verb.text);
                            out("# ");
                        }
                        else {
                            out(verb.text);
                            out(" ");
                        }
                    }
                    removeComma(" ");
                    out("\",");
                }
                removeComma(",");
            }

            out("// this is a grammar for the javascript generative grammar system tracery: https://www.tracery.io\nconst grammar = \n{\n");
            for (var r of rules) {
                var ruleName = r.rule;
                if (ruleName === "START") {
                    ruleName = "origin";
                }
                if (r.tail !== undefined) {
                    out("\""+ruleName+"\":[");
                    outTail(r.tail);
                    out("],\n");
                }
            }
            removeComma(",\n");
            out("\n}");

            return output;
        });
    }


    applyLSystem() {
        this.changeText((txt) => {
            var rules: any;

            try {
                rules = lsystem.parse(this.state.sourceText)
            }
            catch (e: any) {
                return "ERROR: "+e.name + ': ' + e.message;
            }

            let findRule = (ruleName: string) => {
                for (var r of rules) {
                    if (r.rule === ruleName) {
                        return r.tail;
                    }
                }
                return undefined;
            }

            var str = "";

            for (var i = 0; i < txt.length; i++) {
                var c = txt[i];
                var tail = findRule(c);

                str += tail === undefined ? c : tail; 
            }
            return str;
        });
    }

    undo() {
        let t = this.state.text
        this.storeText(this.state.undoText);
        this.setState({text: this.state.undoText});
        this.setState({undoText: t});
    }

    clear() {
        this.changeText(() => {return "";});
    }

    storeSource(sourceText: string) {
        localStorage.setItem("xtxt-modestorage-"+this.state.mode, sourceText)
    }

    setMode(m: string) {
        this.storeSource(this.state.sourceText);

        var stored = localStorage.getItem("xtxt-modestorage-"+m)

        if (stored === undefined || stored === null) {
            stored = "";
        }
        
        this.setState({mode: m, sourceText: stored});
    }

    setExample(ex: string) {
        this.storeSource(ex);
        this.setState({sourceText: ex});
    }

    settings() {
        return (
            <Offcanvas show={this.state.showSettings} onHide={() => {this.setState({showSettings: false})}}>
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                </Offcanvas.Body>
            </Offcanvas>
        );
    }

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <Col>xTXT online</Col>
            <Col>
                <Button variant="outline-success" onClick={() => {this.setState({showInfo: true})}} ><i className="bi bi-info-circle"></i></Button>{' '}
                <Button variant="outline-danger" onClick={() => {this.setState({showSettings: true})}}><i className="bi bi-gear"></i></Button>
            </Col>
          </header>
          <div className="App-buttons">
                <ButtonGroup>
                    {modes.map((radio, idx) => (
                        <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={'outline-danger'}
                        name="radio"
                        value={radio.value}
                        checked={this.state.mode === radio.value}
                        onChange={(e) => this.setMode(e.currentTarget.value)}
                        >
                        {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                <br />
                {this.state.mode === "methods" ?
                    <>
                    <Button variant="outline-primary" onClick={this.changer(superstring.rip)}>rip</Button>{' '}
                    <Button variant="outline-primary" onClick={this.changer(superstring.shuffle)}>shuffle</Button>{' '}
                    <Button variant="outline-primary" onClick={this.changer(superstring.sort)}>sort</Button>{' '}
                    <Button variant="outline-primary" onClick={this.changer(superstring.reverse)}>reverse</Button>{' '}

                    <Button variant="outline-primary" onClick={this.changer(superstring.noise)}>noise</Button>{' '}
                    <Button variant="outline-primary" onClick={this.changer(superstring.part)}>part</Button>{' '}
                    <Button variant="outline-primary" onClick={this.changer(superstring.split)}>split</Button>{' '}
                    <Button variant="outline-primary" onClick={this.changer(superstring.condense)}>condense</Button>{' '}

                    <Button variant="outline-primary" onClick={this.changer(superstring.stretch)}>stretch</Button>{' '}
                    <Button variant="outline-primary" onClick={this.changer(superstring.vowelsOnly)}>vowels only</Button>{' '}
                    <Button variant="outline-primary" onClick={this.changer(superstring.consOnly)}>cons only</Button>{' '}
                    <Button variant="outline-primary" onClick={this.changer(superstring.duplicate)}>duplicate</Button>{' '}
                    <Button variant="outline-primary" onClick={this.changer(superstring.permutate)}>permutate</Button>{' '}<br />
                    </>
                    :
                    <></>
                }      
                {this.state.mode !== "methods" ?
                <Dropdown>
                    <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                        examples
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    {examples[this.state.mode].map((example: any, index: number) => (
                        <Dropdown.Item onClick={()=>{this.setExample(example.content);}}>{example.title}</Dropdown.Item>
                    ))}
                    </Dropdown.Menu>
                </Dropdown>
                : <></>}
                {this.state.mode === "llm" ?
                  <div className="App-text">
                    {this.state.llmEngine !== undefined ?
                        <>
                        <Form>
                        <Form.Control as="textarea" rows={5} value={this.state.sourceText} onChange={this.handleSourceChange} style={{backgroundColor: "#999999", color: "black"}}
                        ref={this.sourceRef} placeholder="enter prompt..." />

                        <Form.Group as={Row}>
                        <Form.Label>temperature {this.state.temperature} </Form.Label>
                        <Form.Range value={(this.state.temperature-0.1)*100} min={0} max={200} onChange={e => this.setState({temperature: 0.1+parseFloat(e.target.value)/100})}/>
                        </Form.Group>                 
                        </Form>
                        <Button variant="outline-danger" onClick={this.applyLLM}>generate</Button>{' '}<br />
                        {this.state.generating ?
                        <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        : <></>
                        }
                        </>
                        :
                        <>
                        <Button variant="outline-danger" onClick={this.loadModel}>Load Model</Button>{' '}<br />
                        <p>{this.state.statusLabel}</p>
                        {this.state.loading ?
                        <>
                        <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p>Loading Model...</p>
                        </> : <></>}
                        </>
                    }
                  </div>
                  : <></>
                }
                {this.state.mode === "markov" ?
                  <div className="App-text">
                    <Form>
                        <Form.Control as="textarea" rows={12} value={this.state.sourceText} onChange={this.handleSourceChange} style={{backgroundColor: "#999999", color: "black"}}
                                        ref={this.sourceRef} placeholder="enter markov source text here..." />

                        <Form.Group as={Row}>
                            <Form.Label>prefix {this.state.prefix} </Form.Label>
                            <Form.Range value={this.state.prefix} min={1} max={10} onChange={e => this.setState({prefix: parseInt(e.target.value, 10)})}/>
                        </Form.Group>
                    </Form>
                    <Button variant="outline-danger" onClick={this.applyMarkov}>generate</Button>{' '}<br />
                    </div>
                  :
                  <>
                  </>
                }
                {this.state.mode === "lsystem" ?
                  <div className="App-text">
                    <Form>
                        <Form.Control as="textarea" rows={12} value={this.state.sourceText} onChange={this.handleSourceChange} style={{backgroundColor: "#999999", color: "black"}}
                                        ref={this.sourceRef} placeholder="enter l-system rules here..." />

                    </Form>
                    <Button variant="outline-danger" onClick={this.applyLSystem}>generate</Button>{' '}<br />
                    </div>
                  :
                  <>
                  </>
                }
                {this.state.mode === "grammar" ?
                  <div className="App-text">
                    <Form>
                        <Form.Control as="textarea" rows={12} value={this.state.sourceText} onChange={this.handleSourceChange} style={{backgroundColor: "#999999", color: "black"}}
                                        ref={this.sourceRef} placeholder="enter grammar rules here..." />

                    </Form>
                    <Button variant="outline-danger" onClick={this.applyGrammar}>generate</Button>{' '}
                    <Button variant="outline-success" onClick={this.convertGrammar}>convert</Button>{' '}<br />
                    </div>
                  :
                  <>
                  </>
              }

            </div>
            <div className="App-text">
                <Form>
                    <Form.Control as="textarea" rows={12} value={this.state.text} onChange={this.handleChange} style={{backgroundColor: "#999999", color: "black"}}
                                    ref={this.inputRef} autoFocus placeholder="input here..." />
                </Form>
            </div>
            <div className="App-buttons">
                <Button variant="outline-success" onClick={this.undo}>undo</Button>{' '}
                <Button variant="outline-success" onClick={this.clear}>clear</Button>{' '}<br />
                <Button variant="outline-success" onClick={this.speak}>speak</Button>{' '}
                <Button variant="outline-danger" onClick={this.stopSpeech}>stop</Button>{' '}
            </div>
            <div>
                <p>this is a project by <a href="https://joerg.piringer.net/">jörg piringer</a></p>
            </div>
            <Info show={this.state.showInfo} onHide={() => {this.setState({showInfo: false})}} />
            { this.settings() }
        </div>
      );
    }
}

export default App;
