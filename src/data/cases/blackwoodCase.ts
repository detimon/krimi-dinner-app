import { MysteryCase } from '../../types';

export const blackwoodCase: MysteryCase = {
  id: 'blackwood-manor',
  title: 'Das Vermächtnis von Schloss Blackwood',
  tagline: 'Ein tosender Schneesturm über dem Hochmoor, ein vergifteter Vintage-Sherry und ein Testament, das niemand überleben sollte.',
  period: 'November 1928 (Späte Golden Twenties)',
  location: 'Schloss Blackwood, Dartmoor, Grafschaft Devon, England',
  playerCount: { min: 4, max: 6, recommended: 6 },
  durationMinutes: 150,
  atmosphereDescription: 'Draußen peitscht eisiger Wind gegen die hohen Bleiglasfenster des neugotischen Schlosses. Im prunkvollen Speisesaal knistert ein gewaltiger Kamin. Schwere Eichentische, Silberbesteck, dicke Vorhänge – und die unheimliche Gewissheit, dass der Mörder unter den Gästen sitzt.',
  
  victim: {
    name: 'Lord Reginald Blackwood',
    title: '68. Baron von Blackwood, Minenmagnat & Sammler',
    portrait: '👑',
    timeOfDeath: '20:15 Uhr (Kurz nach dem Servieren der Vorspeise)',
    foundLocation: 'Auf dem schweren Mahagoni-Sessel am Kopfende der Tafel',
    causeOfDeath: 'Akute Vergiftung (schnell wirkende Blausäure/Bittermandel im Sherry)',
    lastSeen: '20:05 Uhr, als er feierlich sein Kristallglas für die Verkündung des Testaments hob',
    overview: 'Lord Reginald galt als herrschsüchtig, brillant und unerbittlich. Vor einer Woche berief er alle Erben und Vertrauten ein, um sein Testament radikal zu ändern. Niemand wusste, wer begünstigt und wer enterbt wurde.'
  },

  dinnerMenu: [
    {
      courseNumber: 1,
      courseTitle: 'Vorspeise (Der Empfang & Das Verhängnis)',
      dishName: 'Cremige Waldpilz-Maronen-Velouté mit Thymian-Croutons',
      dishDescription: 'Samtige Suppe aus heimischen Steinpilzen, Maronen und einem Hauch Apfel-Cidre, garniert mit knusprigen Buttercroutons.',
      vegetarianAlternative: 'Von Natur aus vegetarisch (oder mit Hafercreme vegan abwandelbar).',
      drinksPairing: 'Lord Reginalds Amontillado Sherry (oder prickelnder Birnen-Cidre).',
      prepTimeInAdvance: 'Am Vortag oder Nachmittag: 25 Minuten Kochzeit.',
      hostActiveTimeDinner: '3 Minuten: Nur im Topf kurz erhitzen, in Schalen schöpfen, Croutons daraufstreuen.',
      advancePrepInstructions: [
        'Suppe nachmittags fertig kochen und im Topf abkühlen lassen.',
        'Baguettewürfel mit Thymian und Knoblauchbutter in der Pfanne goldbraun rösten und in einer Dose bereitstellen.',
        'Suppenschalen und Löffel auf dem Serviertisch bereitstellen.'
      ],
      liveServiceInstructions: [
        'Herdplatte auf mittlere Hitze stellen und Suppe 3 Minuten unter Rühren aufwärmen.',
        'Mit Kelle in Schalen füllen, Croutons drüber – fertig zum Servieren!'
      ],
      storySynchronization: 'Wird zu Spielbeginn serviert, während sich die Gäste in ihren Rollen vorstellen. Sobald die Schalen geleert sind, erhebt Lord Reginald das Glas – und das Drama beginnt!'
    },
    {
      courseNumber: 2,
      courseTitle: 'Hauptgang (Das große Kreuzverhör)',
      dishName: 'Traditioneller Blackwood-Schmortopf mit Rotwein & Portweinschalotten',
      dishDescription: 'Zartgeschmortes Rindfleisch in sämiger Burgunder-Kräutersoße mit geschmorten Schalotten, Karotten und samtigem Kartoffel-Pastinaken-Püree.',
      vegetarianAlternative: 'Portobello-Pilz-Bourguignon mit geräuchertem Tofu und Wurzelgemüse.',
      drinksPairing: 'Kräftiger Cabernet Sauvignon oder alkoholfreier Trauben-Brombeer-Sud.',
      prepTimeInAdvance: 'Vormittags: 30 Min Vorbereitung + 2,5 Std. leises Schmoren im Ofen.',
      hostActiveTimeDinner: '5 Minuten: Schmortopf aus dem warmen Ofen nehmen, Püree kurz umrühren, servieren.',
      advancePrepInstructions: [
        'Fleisch (oder Pilze) am Vormittag anbraten, Soße ansetzen und 2-3 Stunden sanft schmoren lassen (wird durchgezogen noch zarter!).',
        'Kartoffel-Pastinaken-Püree am Nachmittag zubereiten und im Topf bereitstellen.',
        'Den Schmortopf bei 80°C im Ofen warmhalten, während Runde 1 läuft.'
      ],
      liveServiceInstructions: [
        'Püree mit einem Schuss Milch kurz aufkochen und glattrühren (2 Min).',
        'Auf flachen Tellern einen Püreespiegel anrichten, das zarte Schmorgericht daraufgeben.'
      ],
      storySynchronization: 'Wird während der hitzigen Verhöre und Alibi-Vergleiche gegessen. Perfekt, um zwischen Bissen schockierende Beweise vorzulesen!'
    },
    {
      courseNumber: 3,
      courseTitle: 'Dessert (Die Anklage & Das Geständnis)',
      dishName: 'Earl-Grey-Panna-Cotta mit Brombeer-Spiegel & gebrannten Mandeln',
      dishDescription: 'Feine englische Sahnecreme verfeinert mit edlem Bergamotte-Tee, serviert auf herb-süßem Waldbeerenspiegel.',
      vegetarianAlternative: 'Mit Agar-Agar zubereitet (vollständig vegetarisch).',
      drinksPairing: 'Heißer Mokka, Portwein oder Earl Grey Tee mit Milch.',
      prepTimeInAdvance: 'Am Vorabend: 15 Minuten – geliert über Nacht im Kühlschrank.',
      hostActiveTimeDinner: '2 Minuten: Aus dem Kühlschrank nehmen, Mandelsplitter darüberstreuen.',
      advancePrepInstructions: [
        'Panna Cotta in hübsche Gläser oder Förmchen füllen und über Nacht kaltstellen.',
        'Brombeersauce pürieren und in Quetschflasche oder Kännchen bereitstellen.'
      ],
      liveServiceInstructions: [
        'Gläser aus dem Kühlschrank holen, Brombeersauce darüberträufeln, Mandeln darübergeben.'
      ],
      storySynchronization: 'Wird serviert, kurz bevor jeder Gast seine finale Anklage und seinen Verdacht niederlegt. Das süße Finale vor der bitteren Wahrheit.'
    }
  ],

  characters: [
    {
      id: 'eleanor',
      name: 'Lady Eleanor Blackwood',
      title: 'Die kühle Witwe & Schlossherrin',
      age: 54,
      relationToVictim: 'Ehefrau (seit 28 Jahren verheiratet)',
      avatarIcon: '💎',
      isCore: true,
      isMurderer: false,
      costumeRecommendation: 'Dunkles elegantes Abendkleid, Perlenkette, Spitzenfächer, aristokratische Haltung.',
      publicBio: 'Eine stolze Dame aus altem Hochadel. Sie führte Schloss Blackwood mit eiserner Hand und repräsentierte ihren Ehemann stets tadellos, auch wenn ihre Ehe in den letzten Jahren als distanziert galt.',
      secretBackstory: 'Vor drei Tagen fand Eleanor heraus, dass Lord Reginald das gesamte Familienanwesen heimlich als Pfand für riskante Spekulationen an der Londoner Börse versetzt hat. Zudem hatte Reginald die Scheidungspapiere unterschrieben im Schreibtisch liegen! Wäre er am Leben geblieben, stünde sie ohne Titel und Vermögen auf der Straße.',
      motives: [
        'Erhalt ihres Status und Schutzes vor drohender Enterbung und Scheidung.',
        'Verhinderung des Verkaufs des Familienschlosses.'
      ],
      status: 'active',
      fallbackNpcLetter: 'Lady Eleanor hat einen Nervenzusammenbruch erlitten und sich in ihre Gemächer zurückgezogen. Sie lässt durch ihren Hausverwalter folgende Erklärung verlesen: "Ich habe meinen Mann geliebt, doch er trieb uns alle in den Ruin. Wer auch immer es tat, hat das Schloss gerettet..."',
      rounds: {
        round1: {
          secretsToProtect: [
            'Du hattest um 19:30 Uhr einen lautstarken Streit mit Reginald in seinem Arbeitszimmer.',
            'Du hast vor zwei Tagen den Scheidungsanwalt aus London im Schloss empfangen.'
          ],
          publicRumorsToShare: [
            'Dr. Hastings war in den letzten Wochen nervös und zittrig – Reginald murmelte oft über Unstimmigkeiten in den Sanatoriumsbüchern.',
            'Nichte Victoria bat dich gestern verzweifelt um 5.000 Pfund, um Gläubiger abzuwimmeln.'
          ],
          secretMission: 'Lenke den Verdacht auf Dr. Hastings und Victoria. Verberge um jeden Preis das Wort "Scheidung".'
        },
        round2: {
          secretsToProtect: [
            'Man sah dich um 20:00 Uhr mit einem Schlüsselbund bei Reginalds Privattresor.',
            'Erklärung: Du wolltest die Scheidungsunterlagen verbrennen, der Tresor war aber bereits geöffnet!'
          ],
          publicRumorsToShare: [
            'Privatsekretär James Sterling hat in letzter Zeit auffällig viele Akten aus dem Archiv verbrannt.',
            'Reginald trank vor dem Essen stets einen Sherry aus einer speziellen Karaffe, die James immer um 19:45 Uhr bereitstellte.'
          ],
          secretMission: 'Enthülle James\' Rolle bei der Sherry-Zeremonie.'
        },
        round3: {
          secretsToProtect: [
            'Du hast vor dem Dinner die Karaffe berührt, aber nur um zu riechen, ob James den teuren Jahrgang gewählt hat.'
          ],
          publicRumorsToShare: [
            'Du hast im Nachlass einen alten Taufschein von 1894 entdeckt, der James Sterling mit Reginalds verstoßenem Bruder Robert verbindet!'
          ],
          secretMission: 'Bringe den Taufschein ins Spiel und fordere James auf, seine wahre Identität zu gestehen.'
        }
      }
    },

    {
      id: 'hastings',
      name: 'Dr. Arthur Hastings',
      title: 'Der geplagte Leibarzt',
      age: 61,
      relationToVictim: 'Leibarzt und Jugendfreund',
      avatarIcon: '🩺',
      isCore: true,
      isMurderer: false,
      costumeRecommendation: 'Dunkler Tweed-Anzug, Taschenuhr an Kette, Ledertasche, Brille, nervöse Gestik.',
      publicBio: 'Seit dreißig Jahren ist Dr. Hastings die medizinische und seelische Stütze des Lords. Er leitet zudem das von Blackwood finanzierte Moor-Sanatorium für Lungenkranke.',
      secretBackstory: 'Arthur verfiel vor zwei Jahren dem illegalen Würfelspiel in den Londoner Docks. Um seine Schulden zu begleichen, veruntreute er über 12.000 Pfund aus der Stiftung des Sanatoriums. Heute Nachmittag um 16 Uhr zitierte ihn Reginald ins Büro: Er hatte die Belege gefunden und stellte Arthur ein Ultimatum bis 21:00 Uhr: Geständnis oder Gefängnis!',
      motives: [
        'Drohende Inhaftierung und gesellschaftlicher Ruin durch die Entdeckung der Unterschlagung.',
        'Besitz von Giften und Medikamenten durch seinen Beruf.'
      ],
      status: 'active',
      fallbackNpcLetter: 'Dr. Hastings wurde ohnmächtig am Tatort aufgefunden. In seiner Arzttasche fanden die Anwesenden folgendes Tagebuchfragment: "Reginald wusste alles über das Sanatorium... um 21 Uhr wollte er die Polizei rufen. Ich bin ruiniert, doch Gift anzurühren brachte ich nicht übers Herz."',
      rounds: {
        round1: {
          secretsToProtect: [
            'Reginald hat dir heute Nachmittag gedroht, dich der Polizei zu übergeben.',
            'Du trägst in deiner Arzttasche ein Fläschchen hochkonzentrierte Blausäure (offiziell gegen Rattenplagen im Sanatorium).'
          ],
          publicRumorsToShare: [
            'Reginald klagte in letzter Zeit über Herzrasen und Magenbrennen nach Gesprächen mit seinem Sekretär James.',
            'Lady Eleanor hat sich letzte Woche in der Schloss-Apotheke nach Schlafmitteln erkundigt.'
          ],
          secretMission: 'Behalte deine Arzttasche fest verschlossen und behaupte, du hättest Reginald nur Beruhigungstropfen verschrieben.'
        },
        round2: {
          secretsToProtect: [
            'Ein Fleck Bittermandel-Geruch klebt an deinem Taschentuch (du hast vor Schreck geschwitzt, als du am Sherry gerochen hast).',
            'Du hast nach 19:45 Uhr die Schlossküche aufgesucht, um ein Glas Wasser zu holen.'
          ],
          publicRumorsToShare: [
            'Die Symptome des Lords (Krämpfe, bitterer Mandelgeruch, plötzlicher Atemstillstand) deuten eindeutig auf Blausäure-Kaliumzyanid hin.',
            'Jemand mit Zugang zum Giftschrank im Labor oder der Schädlingsbekämpfung muss die Substanz entwendet haben.'
          ],
          secretMission: 'Gib deine medizinische Expertise ab, um als unvoreingenommener Experte zu wirken.'
        },
        round3: {
          secretsToProtect: [
            'Dein Fläschchen Blausäure im Koffer ist verschwunden! Jemand hat es dir vor 19:00 Uhr aus dem Mantel entwendet.'
          ],
          publicRumorsToShare: [
            'Du sahst James Sterling um 18:30 Uhr an deiner abgelegten Manteltasche im Flur hantieren!'
          ],
          secretMission: 'Erkläre der Runde, dass dein Gift gestohlen wurde und du den Dieb im Flur gesehen hast.'
        }
      }
    },

    {
      id: 'sterling',
      name: 'James Sterling',
      title: 'Der akribische Privatsekretär',
      age: 34,
      relationToVictim: 'Privatsekretär (in Wahrheit der enterbte Neffe)',
      avatarIcon: '📜',
      isCore: true,
      isMurderer: true, // DER TÄTER!
      costumeRecommendation: 'Strenger dunkler Anzug, Krawatte, Notizbuch, Füllfederhalter, ruhiges, unterwürfiges Auftreten.',
      publicBio: 'Vor fünf Jahren trat der unscheinbare James Sterling in die Dienste von Lord Reginald. Er verwaltet Rechnungen, Verträge, Termine und führte auch die Feder bei allen Entwürfen des neuen Testaments.',
      secretBackstory: 'James\' wahrer Name ist Julian Blackwood. Er ist der Sohn von Reginalds älterem Bruder Robert, den Reginald einst mit gefälschten Verträgen aus der Erbfolge drängte und ins Elend trieb, wo er starb. James nahm eine falsche Identität an, um sich das Erbe zurückzuholen. Doch heute Morgen diktierte Reginald das finale Testament: Das gesamte Vermögen sollte an eine Stiftung gehen – James sollte nur 50 Pfund "für treue Dienste" erhalten. Reginald verhöhnte ihn: "Ich wusste immer, wessen Brut du bist, mein lieber Julian." Da beschloss James, seinen Racheplan noch heute Abend auszuführen!',
      motives: [
        'Rache für den Tod und die Enteignung seines Vaters Robert.',
        'Verhinderung des neuen Testaments, bevor es vor dem Notar rechtsgültig gesiegelt wird (das alte Testament begünstigte noch die Erbenlinie seines Vaters!).'
      ],
      status: 'active',
      fallbackNpcLetter: 'James Sterling floh in Panik in den Schneesturm. In seinem Schreibtisch fand man den handschriftlichen Entwurf des Testaments und ein leeres Giftfläschchen mit der Notiz: "Gerechtigkeit für meinen Vater Robert. Die Dynastie der Lügner endet heute."',
      rounds: {
        round1: {
          secretsToProtect: [
            'Du hast das alte Testament noch nicht vernichtet, das neue war noch nicht vom Notar beglaubigt.',
            'Du hast um 18:30 Uhr Dr. Hastings\' Mantel durchsucht und das Fläschchen Blausäure entwendet.'
          ],
          publicRumorsToShare: [
            'Lord Reginald hatte heute Streit mit fast jedem im Haus: mit Lady Eleanor, mit Dr. Hastings und mit Nichte Victoria.',
            'Victoria Vance hatte gestern Abend im Weinkeller gestöbert.'
          ],
          secretMission: 'Spiele den perfekten, pflichtbewussten Bediensteten. Lenke den Verdacht dezent auf Victoria und Lady Eleanor.'
        },
        round2: {
          secretsToProtect: [
            'Du hast um 19:40 Uhr die Sherry-Karaffe in der Bibliothek mit drei Tropfen der Blausäure versetzt.',
            'Um 19:45 Uhr hast du das Tablett mit dem Sherry persönlich an Lord Reginalds Platz gestellt.'
          ],
          publicRumorsToShare: [
            'Dr. Hastings war extrem aufgeregt, als er die Bibliothek verließ, und seine Hände zitterten so stark, dass er fast ein Glas fallen ließ.',
            'Inspector Finch ist vielleicht gar kein echter Polizist – wer verfährt sich schon zufällig genau heute hierher?'
          ],
          secretMission: 'Behaupte steif und fest, du hättest den Sherry nur gebracht, aber Dr. Hastings sei kurz darauf allein am Tisch gewesen.'
        },
        round3: {
          secretsToProtect: [
            'Du besitzt eine alte Fotografie deines Vaters Robert Blackwood mit Lord Reginald in deinem Portemonnaie.',
            'Das leere Giftfläschchen hast du im Kamin der Bibliothek zwischen die glühenden Kohlen geworfen.'
          ],
          publicRumorsToShare: [
            'Verteidige dich scharf: Wenn Hastings dich am Mantel gesehen hat, warum hat er dann nicht sofort die Stimme erhoben? Weil er schuldig ist!'
          ],
          secretMission: 'Verstricke dich in ein Schein-Alibi und versuche in letzter Sekunde, die Tat Lady Eleanor anzulasten.'
        }
      }
    },

    {
      id: 'victoria',
      name: 'Victoria Vance',
      title: 'Die extravagante Nichte',
      age: 27,
      relationToVictim: 'Nichte (Tochter von Reginalds Schwester)',
      avatarIcon: '🎷',
      isCore: true,
      isMurderer: false,
      costumeRecommendation: 'Glitzerndes Flapper-Kleid oder Federboa, Perlen, Cocktail-Ring, freches Auftreten, Zigarettenspitze (Requisite).',
      publicBio: 'Victoria lebt das berauschende Leben der Londoner Boheme. Sie singt in Jazz-Clubs, fährt schnelle Roadster und verachtet die stickige Schlossatmosphäre – braucht aber regelmäßig finanzielle "Spritzen" ihres reichen Onkels.',
      secretBackstory: 'Victoria hat im Londoner Nachtleben Spielschulden bei einem berüchtigten Unterweltboss angehäuft. Ihr droht handfeste Gewalt, falls sie bis Montag keine 5.000 Pfund liefert. Onkel Reginald weigerte sich heute eiskalt, ihr auch nur einen Penny zu geben, und drohte, sie aus dem Testament zu streichen.',
      motives: [
        'Akute Lebensgefahr durch Unterwelt-Gläubiger.',
        'Dringender Bedarf an einer sofortigen Erbauszahlung.'
      ],
      status: 'active',
      fallbackNpcLetter: 'Victoria Vance liegt mit einer hysterischen Krise im Gästezimmer. Auf ihrem Nachttisch fand man ein Telegramm aus London: "5.000 Pfund bis Montag, sonst brennt dein Club. Keine Ausreden mehr!"',
      rounds: {
        round1: {
          secretsToProtect: [
            'Du hast nach dem Streit mit Reginald um 18:00 Uhr in der Bibliothek nach wertvollen Antiquitäten oder Bargeld gesucht.',
            'Du hast eine silberne Schnupftabakdose mitgehen lassen.'
          ],
          publicRumorsToShare: [
            'Madame Dubois schlich heute Nachmittag auffällig lange um die Gemäldegalerie herum.',
            'Eleanor und Reginald haben sich im Speisesaal so laut angeschrien, dass man es bis in die Küche hörte.'
          ],
          secretMission: 'Tu so, als sei dir das Geld völlig egal und du wärst nur aus Familiensinn zum Festessen erschienen.'
        },
        round2: {
          secretsToProtect: [
            'Man sah dich um 19:50 Uhr mit einem Tuch im Flur.',
            'Erklärung: Du hattest Rotwein auf dein Kleid geschüttet und wolltest es im Bad abtupfen.'
          ],
          publicRumorsToShare: [
            'James Sterling wirkte die ganze Woche wie ein Roboter, aber vorhin sah ich ihn triumphierend lächeln, als Reginald das Glas hob.',
            'Dr. Hastings riecht ständig nach Medizinschrank – wer weiß, was der alles anrührt.'
          ],
          secretMission: 'Lenke die Aufmerksamkeit auf James\' ungewöhnliches Lächeln vor dem Toast.'
        },
        round3: {
          secretsToProtect: [
            'Du hast in Reginalds Papierkorb einen Briefentwurf gefunden, in dem er James als "Neffe Julian" ansprach!'
          ],
          publicRumorsToShare: [
            'Enthülle den Fund aus dem Papierkorb: James ist kein Fremder, er gehört zur Familie!'
          ],
          secretMission: 'Präsentiere den Briefentwurf triumphierend der ganzen Runde.'
        }
      }
    },

    {
      id: 'finch',
      name: 'Inspector Alistair Finch',
      title: 'Der gestrandete Scotland-Yard-Ermittler',
      age: 45,
      relationToVictim: 'Fremder / Gestrandeter Reisender',
      avatarIcon: '🔍',
      isCore: false, // MODULARE ROLLE (kann entfallen oder NPC sein)
      isMurderer: false,
      costumeRecommendation: 'Klassischer Trenchcoat, Filzhut, Pfeife (Requisite), Notizblock, scharfer Blick.',
      publicBio: 'Inspector Finch war auf dem Weg zu Ermittlungen in Plymouth, als sein Ford im Schneesturm auf der Moorstraße steckenblieb. Durchfroren klopfte er um 19:15 Uhr an die Schlosstore und wurde von Lord Reginald gastfreundlich an die Tafel gebeten.',
      secretBackstory: 'Finchs Anwesenheit war kein reiner Zufall! Er ermittelt seit drei Monaten verdeckt im Fall eines verschwundenen Lord-Bruders und gefälschter Aktienzertifikate der Blackwood-Minen. Er nutzte das Unwetter als Vorwand, um die Bewohner unauffällig zu beobachten.',
      motives: [
        'Kein persönliches Mordmotiv – hat jedoch eigene berufliche Geheimnisse zu verbergen.'
      ],
      status: 'active',
      fallbackNpcLetter: 'Inspector Finch ist draußen geblieben, um den telegrafischen Kontakt zur Außenwelt zu reparieren. Er sendet folgende Instruktion über die Haussprechanlage: "Niemand verlässt den Raum! Sichern Sie das Sherryglas und überprüfen Sie alle Alibis zwischen 19:40 und 20:15 Uhr!"',
      rounds: {
        round1: {
          secretsToProtect: [
            'Dein Wagen hatte gar keine Panne – du hast absichtlich die Zündkerze herausgedreht, um einen plausiblen Grund zu haben, die Nacht hier zu verbringen.'
          ],
          publicRumorsToShare: [
            'Als du das Schloss betratst, wirkte die Atmosphäre zum Schneiden dick: Jeder mied die Blicke des anderen.',
            'Im Vorraum roch es intensiv nach frischem Brandrauch – als wären im Kamin Papiere vernichtet worden.'
          ],
          secretMission: 'Nutze deine Autorität, um die anderen Gäste nach ihren letzten Gesprächen mit Lord Reginald zu befragen.'
        },
        round2: {
          secretsToProtect: [
            'Du hast eine Akte über "Robert Blackwood und Nachkommen" in deiner Aktentasche.'
          ],
          publicRumorsToShare: [
            'Du hast die Sherry-Karaffe forensisch untersucht: Die Blausäure war nicht im Glas des Lords, sondern direkt in der Karaffe gelöst! Der Mörder wusste, dass nur der Lord daraus trinken würde.'
          ],
          secretMission: 'Gib diesen forensischen Schlüsselhinweis an die Gruppe weiter.'
        },
        round3: {
          secretsToProtect: [
            'Du hast Scotland Yard per Telegrafenleitung informiert, dass die Beweise auf einen Täter aus dem engsten Kreis hindeuten.'
          ],
          publicRumorsToShare: [
            'Fasse die Zeitlinie zusammen: Zwischen 19:40 und 19:50 Uhr betraten nur zwei Personen die Bibliothek: Dr. Hastings und James Sterling!'
          ],
          secretMission: 'Konfrontiere die Verdächtigen mit dem Zeitfenster.'
        }
      }
    },

    {
      id: 'dubois',
      name: 'Madame Vivienne Dubois',
      title: 'Die rätselhafte Pariser Antiquitätenhändlerin',
      age: 40,
      relationToVictim: 'Geschäftspartnerin & Gast',
      avatarIcon: '🎭',
      isCore: false, // MODULARE ROLLE (kann entfallen oder NPC sein)
      isMurderer: false,
      costumeRecommendation: 'Glamouröser Seidenschal, Samtkleid, französischer Akzent, Lupe oder Handschuhe.',
      publicBio: 'Eine weltgewandte Händlerin seltener Gemälde und Juwelen aus Paris. Sie reiste an, um ein angebliches Renaissance-Gemälde aus dem Blackwood-Besitz zu schätzen und für eine Pariser Auktion vorzubereiten.',
      secretBackstory: 'Vivienne ist in Wahrheit eine Hehlerin für gestohlene Kunstgegenstände. Lord Reginald hatte dies vor drei Tagen entdeckt und sie erpresst: Sie sollte das wertvolle Familien-Triptychon zum zehnfachen Wert als "Echt" zertifizieren, um Reginalds Bankkredite zu retten, andernfalls würde er sie an Interpol verraten!',
      motives: [
        'Verhinderung ihrer Enttarnung vor Interpol.',
        'Widerstand gegen die skrupellose Erpressung des Lords.'
      ],
      status: 'active',
      fallbackNpcLetter: 'Madame Dubois hat sich mit Migräne in ihr Gemach zurückgezogen. Unter ihrer Zimmertür fand man eine Quittung über Kunstschätzungen und eine Notiz: "Reginald wollte mich zwingen, Fälschungen zu siegeln. Er war ein Monster, aber ich bin eine Geschäftsfrau, keine Mörderin."',
      rounds: {
        round1: {
          secretsToProtect: [
            'Du weißt, dass das Blackwood-Gemälde in der Galerie eine billige Kopie ist – der Lord hat das Original längst heimlich verkauft.'
          ],
          publicRumorsToShare: [
            'Lord Reginald flüsterte beim Aperitif: "Heute Abend fällt die Maske einiger hochmütiger Personen hier."',
            'Lady Eleanor schien panische Angst vor dieser Aussage zu haben.'
          ],
          secretMission: 'Beobachte genau, wer nach Erwähnung der Familienschulden nervös wird.'
        },
        round2: {
          secretsToProtect: [
            'Du hast um 19:35 Uhr in der Galerie nach Beweisen gegen Reginalds Erpressung gesucht.'
          ],
          publicRumorsToShare: [
            'Du hast gesehen, wie James Sterling Dr. Hastings\' Ledertasche im Vorraum anstarrte und sich vergewisserte, dass der Gang leer war.'
          ],
          secretMission: 'Erzähle der Gruppe von James\' verdächtigem Verhalten im Vorraum.'
        },
        round3: {
          secretsToProtect: [
            'Du hattest einen Fluchtplan für 22:00 Uhr vorbereitet.'
          ],
          publicRumorsToShare: [
            'Reginald vertraute dir gestern an: "Mein Sekretär hält sich für klüger als er ist. Er weiß noch nicht, dass ein Kuckuckskind kein Erbe antritt."'
          ],
          secretMission: 'Gib diesen entscheidenden Hinweis auf James\' wahre Herkunft preis.'
        }
      }
    }
  ],

  clues: [
    {
      id: 'clue-sherry',
      title: 'Die Sherry-Karaffe der Bibliothek',
      type: 'physical',
      round: 1,
      foundLocation: 'Auf dem Beistelltisch neben Lord Reginalds Sesseln in der Bibliothek',
      teaser: 'Kristallglas-Karaffe mit Amontillado-Sherry. Am Karaffenrand schimmert ein weißlicher Rückstand.',
      detailedContent: 'Die Karaffe wurde um 19:45 Uhr frisch befüllt in die Bibliothek gebracht. Der Geruch nach gerösteten Mandeln überdeckt nur mühsam die tödliche Note von Blausäure (Zyankali). Da nur Lord Reginald aus seiner Privat-Karaffe trank, war das Gift präzise auf ihn ausgerichtet.',
      isRevealed: false
    },
    {
      id: 'clue-will',
      title: 'Das zerrissene Testament & der Siegelwachs',
      type: 'document',
      round: 2,
      foundLocation: 'Im Kamin der Bibliothek, halb verbrannt zwischen den Scheiten',
      teaser: 'Ein versengtes Blatt Pergament mit Reginalds Petschaft und Unterschrift.',
      detailedContent: '"...weder Eleanor noch meine Nichte Victoria sollen über das Gut verfügen. Mein gesamtes Vermögen übertrage ich der Stiftung Blackwood, ausgenommen 50 Pfund für meinen Sekretär Julian B. alias James..." Die Datierung trägt das heutige Datum, 16:30 Uhr.',
      isRevealed: false
    },
    {
      id: 'clue-bag',
      title: 'Die Arzttasche von Dr. Hastings',
      type: 'forensic',
      round: 2,
      foundLocation: 'Garderobe im Eingangsbereich, unter Hastings\' Mantel',
      teaser: 'Schwarze Ledertasche mit medizinischen Instrumenten.',
      detailedContent: 'Im Fach für toxische Reagenzien befindet sich eine leere Halterung, beschriftet mit "Acidum Hydrocyanicum 10% (Gift!)". Der Korken fehlt. Dr. Hastings schwört, die Ampulle sei am Nachmittag noch da gewesen.',
      isRevealed: false
    },
    {
      id: 'clue-audio',
      title: 'Audio-Tonband: Reginalds Diktat an den Notar',
      type: 'audio',
      round: 3,
      foundLocation: 'Auf dem Edison-Diktiergerät auf Reginalds Schreibtisch',
      teaser: 'Eine wachsartige Tonwalze mit Reginalds krächzender Stimme.',
      detailedContent: 'Transkript des Bandes: "James... schreib das Wort für Wort. Ich weiß, wer dein Vater war. Robert war ein Narr, und du bist sein Ebenbild. Du glaubtest, mich täuschen zu können? Heute Abend werde ich der Familie verkünden, wer du wirklich bist – und dich vor die Schlosstore jagen!"',
      audioTranscript: 'Lord Reginald: "James... schreib das Wort für Wort! Glaubst du im Ernst, ich wüsste nicht, wer du bist? Dein Vater Robert war ein Hochstapler, und du kriechst unter falschem Namen in mein Haus! Heute Abend, beim großen Toast, werde ich deine Farce vor allen beenden!"',
      isRevealed: false
    },
    {
      id: 'clue-photo',
      title: 'Vergilbte Fotografie von 1898',
      type: 'document',
      round: 3,
      foundLocation: 'Versteckt im doppelten Boden von James Sterlings Aktentasche',
      teaser: 'Schwarz-Weiß-Aufnahme zweier junger Männer vor Schloss Blackwood.',
      detailedContent: 'Auf der Rückseite steht mit Tinte geschrieben: "Robert und Reginald Blackwood – Brüder und Rivalen". Der junge Robert Blackwood hat die exakt gleichen Gesichtszüge und stechend grauen Augen wie Sekretär James Sterling.',
      isRevealed: false
    }
  ],

  solution: {
    killerId: 'sterling',
    killerName: 'James Sterling (Julian Blackwood)',
    motive: 'Rache für die Zerstörung seines Vaters Robert Blackwood sowie die akute Gefahr der Bloßstellung und vollständigen Enterbung durch das neue Testament.',
    execution: 'James Sterling entwendete Dr. Hastings um 18:30 Uhr das Fläschchen Blausäure aus dessen im Flur abgelegter Arzttasche. Um 19:40 Uhr bereitete er wie jeden Abend die persönliche Amontillado-Sherry-Karaffe des Lords für die Bibliothek vor. Er träufelte drei Tropfen Blausäure hinein und brachte das Tablett um 19:45 Uhr an den Tisch. Als Lord Reginald nach der Vorspeise um 20:05 Uhr das Glas erhob, um das Testament feierlich zu verlesen und James zu enttarnen, trank er das Gift und brach wenige Minuten später tot zusammen.',
    chronology: [
      { time: '16:30', event: 'Lord Reginald diktiert James das neue Testament und konfrontiert ihn mit seiner wahren Abstammung.', actor: 'Lord Reginald & James' },
      { time: '18:00', event: 'Victoria bettelt vergeblich um 5.000 Pfund; Eleanor fordert Rechenschaft über die Schulden.', actor: 'Victoria & Eleanor' },
      { time: '18:30', event: 'James durchsucht Hastings\' Mantel und stiehlt die Blausäure-Ampulle.', actor: 'James Sterling' },
      { time: '19:15', event: 'Inspector Finch trifft mit scheinbarer Autopanne im Schneesturm ein.', actor: 'Inspector Finch' },
      { time: '19:40', event: 'James vergiftet die Sherry-Karaffe in der Anrichte.', actor: 'James Sterling' },
      { time: '19:45', event: 'James serviert die Karaffe an Reginalds Platz.', actor: 'James Sterling' },
      { time: '20:00', event: 'Die Gäste nehmen Platz, die Pilz-Velouté wird serviert.', actor: 'Alle' },
      { time: '20:05', event: 'Lord Reginald trinkt seinen Sherry und hebt das Glas zum Toast.', actor: 'Lord Reginald' },
      { time: '20:15', event: 'Lord Reginald bricht mit Krämpfen zusammen – tot.', actor: 'Lord Reginald' }
    ],
    fullConfession: 'Es stimmt. Ich habe es getan. Mein Name ist nicht Sterling – ich bin Julian Blackwood! Mein Vater Robert baute dieses Imperium mit auf, bis mein Onkel Reginald ihn erpresste, fälschte und ruinierte. Mein Vater starb im Elend in den Slums von Manchester! Reginald hat mein ganzes Leben gestohlen. Und heute wollte er mich wie einen Hund vor die Tür jagen. Ich bereue nicht, dass dieser grausame Mann die Welt verlassen hat – ich bereue nur, dass er nicht länger gelitten hat!'
  }
};
