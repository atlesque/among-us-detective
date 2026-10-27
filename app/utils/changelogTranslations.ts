import type { SupportedLocale } from '~/utils/translations'

export interface LocalizedChangelogEntry {
  date: string
  title: string
  changes: string[]
}

export interface LocalizedChangelogCopy {
  entries: LocalizedChangelogEntry[]
  olderEntriesNotice: string
}

export const changelogTranslations: Record<SupportedLocale, LocalizedChangelogCopy> = {
  'en-US': {
    entries: [
      {
        date: '2026-10-28',
        title: 'v2.5 — Timer, privacy choices and a week of fixes',
        changes: [
          '<b>⏱️ Timer and stopwatch:</b> A dock timer with Among Us presets for kill cooldown, discussion and sabotages, plus a stopwatch you can stamp into your notes. Press S to open it.',
          '<b>🍪 You choose about analytics:</b> Google Analytics only loads after you allow it. You can change your choice any time on the privacy page, which now also describes error reporting accurately.',
          '<b>💾 Remembers more:</b> Your selected map and all settings are kept between visits, and settings from the previous version of the app carry over.',
          '<b>🔄 No surprise reloads:</b> When a new version is available, the app asks before updating instead of reloading during a match.',
          '<b>🛰️ Tracker role:</b> Added the official Tracker role icon.',
          '<b>♿ Accessibility and phones:</b> The roster and dialogs work with the keyboard, and buttons and docks stay clear of notches and home bars.',
          '<b>🐛 Fixes:</b> Shortcuts no longer react to Ctrl, Cmd or Alt combinations, Escape behaves correctly while typing, saying “enter” in dictation only matches the whole word, and more pages are translated.',
        ],
      },
      {
        date: '2026-10-04',
        title: 'v2.4 — Critical vote alerts and match impostor settings',
        changes: [
          '<b>🚨 Critical vote alerts:</b> Real-time reminders during meetings when the crew is at risk of a double kill, at match point, or when skipping vote is mathematically safe.',
          '<b>👾 Match impostor selector:</b> Quickly set the number of impostors for the match (1, 2, or 3) directly in the lobby bar, dynamically capped by lobby size.',
        ],
      },
      {
        date: '2026-09-23',
        title: 'v2.3 — Light mode',
        changes: [
          '<b>☀️ Light mode:</b> Every board and popover, the Detective Notes panel and all dialogs now support light mode, with better contrast for color names and secondary colors.',
        ],
      },
      {
        date: '2026-09-21',
        title: 'v2.2 — Investigation hardening and usability polish',
        changes: [
          '<b>🔒 Read-only history snapshots:</b> Past-round snapshots now lock drag-and-drop and context edits so reviewing history cannot change current game data.',
          '<b>🛡️ More resilient sessions:</b> The first-round match is restored after reload for up to two hours, and corrupted browser storage is handled safely.',
          '<b>🔄 Cleaner match reset:</b> New Match resets Impostor Mode and fellow impostors while preserving the active lobby roster.',
          '<b>🎭 Consistent impostor roles:</b> Confirmed impostor roles now move consistently into the fellow-impostor column.',
          '<b>🌐 Localized tasks and locations:</b> Official names are available in all six supported languages; tan is localized as “Cáqui” in pt-BR.',
          '<b>🎙️ Voice input controls:</b> Speech language follows the browser language by default, with a dedicated language selector and permission controls.',
          '<b>🍪 Clearer privacy notice:</b> The notice names production analytics and diagnostics and links to the privacy policy.',
          '<b>📱 Better roster support on phones:</b> The color picker stays within narrow screens, and meeting counts require manual entry.',
        ],
      },
      {
        date: '2026-09-20',
        title: 'v2.1 — Performance, shortcuts, and help updates',
        changes: [
          '<b>⚡ Performance:</b> Added a Settings option to disable animations for a simpler, lower-motion interface.',
          '<b>📚 Help redesign:</b> Updated the help panel layout and expanded its setup, Impostor Mode, and shortcut guidance.',
          '<b>⌨️ Keyboard shortcuts:</b> Added quick keys for Notes (N), Map (M), Tasks (T), Impostor Mode (I), roster (L), and closing or minimizing (Esc).',
          '<b>📜 Credits and disclaimer:</b> Clarified creator credits, added a viewer for the archived original letter, and explained where donations go.',
          '<b>🌐 Language support:</b> Added translations for the main interface in all six supported languages.',
        ],
      },
    ],
    olderEntriesNotice: 'Earlier release notes are shown in English.',
  },
  'pt-BR': {
    entries: [
      {
        date: '2026-10-28',
        title: 'v2.5 — Timer, escolhas de privacidade e uma semana de correções',
        changes: [
          '<b>⏱️ Timer e cronômetro:</b> Um timer no dock com predefinições do Among Us para recarga de kill, discussão e sabotagens, além de um cronômetro que você pode registrar nas suas notas. Pressione S para abrir.',
          '<b>🍪 Você decide sobre as análises:</b> O Google Analytics só carrega depois que você permitir. Você pode mudar sua escolha a qualquer momento na página de privacidade, que agora também descreve corretamente o relatório de erros.',
          '<b>💾 Lembra mais coisas:</b> O mapa selecionado e todas as configurações são mantidos entre visitas, e as configurações da versão anterior do app são aproveitadas.',
          '<b>🔄 Sem recarregamentos inesperados:</b> Quando há uma nova versão, o app pergunta antes de atualizar em vez de recarregar durante a partida.',
          '<b>🛰️ Função Rastreador:</b> Adicionado o ícone oficial da função Rastreador.',
          '<b>♿ Acessibilidade e celulares:</b> A escalação e as janelas funcionam pelo teclado, e botões e o dock ficam longe de entalhes e barras de início.',
          '<b>🐛 Correções:</b> Os atalhos não reagem mais a combinações com Ctrl, Cmd ou Alt, o Esc funciona corretamente ao digitar, dizer “enter” no ditado só reconhece a palavra inteira e mais páginas foram traduzidas.',
        ],
      },
      {
        date: '2026-10-04',
        title: 'v2.4 — Alertas de votação crítica e ajuste de impostores',
        changes: [
          '<b>🚨 Alertas de votação crítica:</b> Avisos em tempo real durante reuniões quando a tripulação corre risco de double kill, em ponto decisivo ou quando pular o voto é seguro.',
          '<b>👾 Seletor de impostores:</b> Escolha rápida da quantidade de impostores na partida (1, 2 ou 3) direto na barra do lobby, limitado dinamicamente pelo tamanho do lobby.',
        ],
      },
      {
        date: '2026-09-23',
        title: 'v2.3 — Modo claro',
        changes: [
          '<b>☀️ Modo claro:</b> Todos os quadros, popovers, o Bloco do Detetive e as janelas agora têm modo claro, com melhor contraste para nomes de cores e cores secundárias.',
        ],
      },
      {
        date: '2026-09-21',
        title: 'v2.2 — Melhorias de robustez e usabilidade',
        changes: [
          '<b>🔒 Histórico somente para leitura:</b> Os registros de rodadas anteriores agora bloqueiam arrastar e soltar e edições pelo menu, evitando alterações nos dados atuais ao consultar o histórico.',
          '<b>🛡️ Sessões mais resilientes:</b> A partida da primeira rodada é restaurada após recarregar a página por até duas horas, e dados corrompidos do navegador são tratados com segurança.',
          '<b>🔄 Reinício de partida aprimorado:</b> Nova Partida reinicia o Modo Impostor e os impostores aliados, preservando a escalação ativa do lobby.',
          '<b>🎭 Funções de impostor consistentes:</b> Funções de impostor confirmadas agora são direcionadas corretamente à coluna de aliados.',
          '<b>🌐 Tarefas e locais traduzidos:</b> Os nomes oficiais estão disponíveis nos seis idiomas compatíveis; “tan” foi traduzido como “Cáqui” em pt-BR.',
          '<b>🎙️ Controles de voz:</b> O idioma da fala segue o idioma do navegador por padrão, com seletor de idioma e controles de permissão próprios.',
          '<b>🍪 Aviso de privacidade mais claro:</b> O aviso informa quais análises e diagnósticos são enviados em produção e inclui um link para a política de privacidade.',
          '<b>📱 Melhor suporte ao lobby em celulares:</b> O seletor de cores fica dentro da tela em dispositivos estreitos, e a contagem de reuniões exige entrada manual.',
        ],
      },
      {
        date: '2026-09-20',
        title: 'v2.1 — Desempenho, atalhos e ajuda',
        changes: [
          '<b>⚡ Desempenho:</b> Foi adicionada às configurações uma opção para desativar animações e reduzir o movimento na interface.',
          '<b>📚 Ajuda reformulada:</b> O painel de ajuda foi reorganizado, com orientações ampliadas sobre preparação, Modo Impostor e atalhos.',
          '<b>⌨️ Atalhos de teclado:</b> Acesso rápido a Notas (N), Mapa (M), Tarefas (T), Modo Impostor (I), escalação (L) e fechar ou minimizar (Esc).',
          '<b>📜 Créditos e aviso:</b> Créditos dos criadores esclarecidos, visualizador da carta original arquivada adicionado e destino das doações explicado.',
          '<b>🌐 Idiomas:</b> A interface principal foi traduzida para os seis idiomas compatíveis.',
        ],
      },
    ],
    olderEntriesNotice: 'As notas de versões anteriores são exibidas em inglês.',
  },
  'es-ES': {
    entries: [
      {
        date: '2026-10-28',
        title: 'v2.5 — Temporizador, opciones de privacidad y una semana de correcciones',
        changes: [
          '<b>⏱️ Temporizador y cronómetro:</b> Un temporizador en la barra inferior con ajustes de Among Us para el tiempo de recarga de kill, la discusión y los sabotajes, y un cronómetro que puedes anotar en tus notas. Pulsa S para abrirlo.',
          '<b>🍪 Tú decides sobre las analíticas:</b> Google Analytics solo se carga después de que lo permitas. Puedes cambiar tu elección en cualquier momento en la página de privacidad, que ahora también describe con precisión el informe de errores.',
          '<b>💾 Recuerda más:</b> El mapa seleccionado y todos los ajustes se conservan entre visitas, y los ajustes de la versión anterior de la app se mantienen.',
          '<b>🔄 Sin recargas inesperadas:</b> Cuando hay una nueva versión, la app pregunta antes de actualizar en lugar de recargarse durante la partida.',
          '<b>🛰️ Rol de Rastreador:</b> Se añadió el icono oficial del rol Rastreador.',
          '<b>♿ Accesibilidad y móviles:</b> La sala y los diálogos funcionan con el teclado, y los botones y la barra inferior no quedan bajo la muesca ni la barra de inicio.',
          '<b>🐛 Correcciones:</b> Los atajos ya no reaccionan a combinaciones con Ctrl, Cmd o Alt, Escape funciona bien mientras escribes, decir “enter” en el dictado solo reconoce la palabra completa y hay más páginas traducidas.',
        ],
      },
      {
        date: '2026-10-04',
        title: 'v2.4 — Alertas de votación crítica y ajustes de impostores',
        changes: [
          '<b>🚨 Alertas de votación crítica:</b> Avisos en tiempo real durante las reuniones cuando la tripulación corre riesgo de double kill, está en punto de partido o cuando saltar la votación es seguro.',
          '<b>👾 Selector de impostores:</b> Selecciona rápidamente la cantidad de impostores (1, 2 o 3) directamente en la barra de la sala, limitado por el tamaño del lobby.',
        ],
      },
      {
        date: '2026-09-23',
        title: 'v2.3 — Modo claro',
        changes: [
          '<b>☀️ Modo claro:</b> Todos los tableros, ventanas emergentes, el Bloc de Notas del Detective y los diálogos ahora tienen modo claro, con mejor contraste para los nombres de colores y los colores secundarios.',
        ],
      },
      {
        date: '2026-09-21',
        title: 'v2.2 — Mejoras de robustez y uso',
        changes: [
          '<b>🔒 Historial de solo lectura:</b> Las instantáneas de rondas anteriores bloquean ahora el arrastre y las ediciones contextuales para que consultar el historial no cambie los datos actuales.',
          '<b>🛡️ Sesiones más resistentes:</b> La partida de la primera ronda se restaura tras recargar durante un máximo de dos horas, y los datos dañados del navegador se gestionan de forma segura.',
          '<b>🔄 Reinicio de partida mejorado:</b> Nueva partida reinicia el modo Impostor y los impostores aliados, pero conserva la lista activa del lobby.',
          '<b>🎭 Roles de impostor coherentes:</b> Los roles de impostor confirmados se trasladan ahora correctamente a la columna de aliados.',
          '<b>🌐 Tareas y ubicaciones traducidas:</b> Los nombres oficiales están disponibles en los seis idiomas compatibles; “tan” se traduce como “Cáqui” en pt-BR.',
          '<b>🎙️ Controles de voz:</b> El idioma del reconocimiento sigue el del navegador de forma predeterminada, con selector de idioma y controles de permisos propios.',
          '<b>🍪 Aviso de privacidad más claro:</b> El aviso identifica las analíticas y los diagnósticos enviados en producción e incluye un enlace a la política de privacidad.',
          '<b>📱 Mejor adaptación del lobby al móvil:</b> El selector de colores permanece dentro de pantallas estrechas y el contador de reuniones requiere entrada manual.',
        ],
      },
      {
        date: '2026-09-20',
        title: 'v2.1 — Rendimiento, atajos y ayuda',
        changes: [
          '<b>⚡ Rendimiento:</b> Se añadió a Ajustes una opción para desactivar animaciones y reducir el movimiento de la interfaz.',
          '<b>📚 Ayuda renovada:</b> Se reorganizó el panel de ayuda y se ampliaron las guías de configuración, modo Impostor y atajos.',
          '<b>⌨️ Atajos de teclado:</b> Acceso rápido a Notas (N), Mapa (M), Tareas (T), modo Impostor (I), lista de jugadores (L) y cerrar o minimizar (Esc).',
          '<b>📜 Créditos y aviso:</b> Se aclararon los créditos, se añadió un visor de la carta original archivada y se explicó el destino de las donaciones.',
          '<b>🌐 Idiomas:</b> La interfaz principal se tradujo a los seis idiomas disponibles.',
        ],
      },
    ],
    olderEntriesNotice: 'Las notas de versiones anteriores se muestran en inglés.',
  },
  'fr-FR': {
    entries: [
      {
        date: '2026-10-28',
        title: 'v2.5 — Minuteur, choix de confidentialité et une semaine de corrections',
        changes: [
          '<b>⏱️ Minuteur et chronomètre :</b> Un minuteur dans la barre du bas avec des préréglages Among Us pour le temps de recharge du kill, la discussion et les sabotages, et un chronomètre que vous pouvez noter dans vos notes. Appuyez sur S pour l\'ouvrir.',
          '<b>🍪 Vous choisissez pour les statistiques :</b> Google Analytics ne se charge qu\'après votre accord. Vous pouvez changer d\'avis à tout moment sur la page de confidentialité, qui décrit aussi désormais correctement le suivi des erreurs.',
          '<b>💾 Garde plus de choses en mémoire :</b> La carte choisie et tous les paramètres sont conservés d\'une visite à l\'autre, et les paramètres de l\'ancienne version de l\'app sont repris.',
          '<b>🔄 Plus de rechargements surprises :</b> Quand une nouvelle version est disponible, l\'app demande avant de se mettre à jour au lieu de se recharger en pleine partie.',
          '<b>🛰️ Rôle Traqueur :</b> Ajout de l\'icône officielle du rôle Traqueur.',
          '<b>♿ Accessibilité et mobiles :</b> Le salon et les fenêtres s\'utilisent au clavier, et les boutons et la barre du bas restent à l\'écart des encoches et barres d\'accueil.',
          '<b>🐛 Corrections :</b> Les raccourcis ne réagissent plus aux combinaisons avec Ctrl, Cmd ou Alt, Échap fonctionne correctement pendant la saisie, dire « enter » en dictée ne reconnaît que le mot entier, et davantage de pages sont traduites.',
        ],
      },
      {
        date: '2026-10-04',
        title: 'v2.4 — Alertes de vote critique et paramètres d\'imposteurs',
        changes: [
          '<b>🚨 Alertes de vote critique :</b> Rappels en temps réel pendant les réunions signalant le danger de double kill, balle de match ou quand passer le vote est sûr.',
          '<b>👾 Sélecteur d\'imposteurs :</b> Choisissez rapidement le nombre d\'imposteurs (1, 2 ou 3) directement dans la barre du salon, limité selon la taille du lobby.',
        ],
      },
      {
        date: '2026-09-23',
        title: 'v2.3 — Mode clair',
        changes: [
          '<b>☀️ Mode clair :</b> Tous les tableaux, les fenêtres contextuelles, le Carnet de Détective et les dialogues prennent désormais en charge le mode clair, avec un meilleur contraste pour les noms de couleurs et les couleurs secondaires.',
        ],
      },
      {
        date: '2026-09-21',
        title: 'v2.2 — Fiabilité et confort d’utilisation',
        changes: [
          '<b>🔒 Historique en lecture seule :</b> Les instantanés des manches précédentes bloquent désormais le glisser-déposer et les modifications contextuelles afin que leur consultation ne change pas les données actuelles.',
          '<b>🛡️ Sessions plus robustes :</b> La partie de la première manche est restaurée après rechargement pendant deux heures au maximum ; les données de navigateur endommagées sont gérées sans risque.',
          '<b>🔄 Réinitialisation améliorée :</b> Nouvelle partie réinitialise le mode Imposteur et les imposteurs alliés tout en conservant le groupe actif du lobby.',
          '<b>🎭 Rôles d’imposteur cohérents :</b> Les rôles d’imposteur confirmés sont désormais placés correctement dans la colonne des alliés.',
          '<b>🌐 Tâches et lieux traduits :</b> Les noms officiels sont disponibles dans les six langues prises en charge ; « tan » devient « Cáqui » en pt-BR.',
          '<b>🎙️ Commandes vocales :</b> La langue de reconnaissance suit celle du navigateur par défaut, avec un sélecteur dédié et des commandes d’autorisation.',
          '<b>🍪 Avis de confidentialité plus clair :</b> L’avis précise les mesures d’audience et données de diagnostic envoyées en production et renvoie vers la politique de confidentialité.',
          '<b>📱 Lobby mieux adapté au mobile :</b> Le sélecteur de couleurs reste dans les petits écrans et le compteur de réunions demande une saisie manuelle.',
        ],
      },
      {
        date: '2026-09-20',
        title: 'v2.1 — Performances, raccourcis et aide',
        changes: [
          '<b>⚡ Performances :</b> Une option des paramètres permet de désactiver les animations et de réduire les mouvements de l’interface.',
          '<b>📚 Aide repensée :</b> Le panneau d’aide a été réorganisé et ses conseils sur la préparation, le mode Imposteur et les raccourcis ont été étoffés.',
          '<b>⌨️ Raccourcis clavier :</b> Accès rapide aux Notes (N), à la Carte (M), aux Tâches (T), au mode Imposteur (I), au roster (L) et à la fermeture ou réduction (Esc).',
          '<b>📜 Crédits et avis :</b> Crédits des créateurs clarifiés, lecteur de la lettre originale archivée ajouté et destination des dons expliquée.',
          '<b>🌐 Langues :</b> L’interface principale a été traduite dans les six langues prises en charge.',
        ],
      },
    ],
    olderEntriesNotice: 'Les notes des anciennes versions sont affichées en anglais.',
  },
  'de-DE': {
    entries: [
      {
        date: '2026-10-28',
        title: 'v2.5 — Timer, Datenschutz-Auswahl und eine Woche voller Korrekturen',
        changes: [
          '<b>⏱️ Timer und Stoppuhr:</b> Ein Timer in der unteren Leiste mit Among-Us-Vorgaben für Kill-Cooldown, Diskussion und Sabotagen sowie eine Stoppuhr, deren Zeit du in deine Notizen übernehmen kannst. Mit S öffnen.',
          '<b>🍪 Du entscheidest über Analysen:</b> Google Analytics wird erst geladen, wenn du es erlaubst. Du kannst deine Wahl jederzeit auf der Datenschutzseite ändern, die jetzt auch die Fehlerberichte korrekt beschreibt.',
          '<b>💾 Merkt sich mehr:</b> Die gewählte Karte und alle Einstellungen bleiben zwischen Besuchen erhalten, und Einstellungen aus der vorherigen App-Version werden übernommen.',
          '<b>🔄 Keine überraschenden Neuladungen:</b> Wenn eine neue Version verfügbar ist, fragt die App vor dem Update, statt mitten im Match neu zu laden.',
          '<b>🛰️ Fährtenleser-Rolle:</b> Das offizielle Symbol der Fährtenleser-Rolle wurde hinzugefügt.',
          '<b>♿ Barrierefreiheit und Smartphones:</b> Lobby und Dialoge lassen sich per Tastatur bedienen, und Buttons und die untere Leiste bleiben frei von Notch und Home-Leiste.',
          '<b>🐛 Korrekturen:</b> Tastenkürzel reagieren nicht mehr auf Kombinationen mit Strg, Cmd oder Alt, Escape funktioniert beim Tippen richtig, „enter“ beim Diktieren erkennt nur das ganze Wort, und weitere Seiten sind übersetzt.',
        ],
      },
      {
        date: '2026-10-04',
        title: 'v2.4 — Kritische Abstimmungswarnungen und Impostor-Einstellungen',
        changes: [
          '<b>🚨 Kritische Abstimmungswarnungen:</b> Echtzeit-Warnungen bei Meetings bei Gefahr eines Double Kills, bei Matchbällen oder wenn Überspringen sicher ist.',
          '<b>👾 Match-Impostor-Auswahl:</b> Schnelle Auswahl der Impostor-Anzahl (1, 2 oder 3) direkt in der Lobby-Leiste, dynamisch begrenzt durch die Lobby-Größe.',
        ],
      },
      {
        date: '2026-09-23',
        title: 'v2.3 — Heller Modus',
        changes: [
          '<b>☀️ Heller Modus:</b> Alle Boards, Popover, die Detektiv-Notizen und alle Dialoge unterstützen jetzt den hellen Modus, mit besserem Kontrast für Farbnamen und Sekundärfarben.',
        ],
      },
      {
        date: '2026-09-21',
        title: 'v2.2 — Mehr Stabilität und bessere Bedienung',
        changes: [
          '<b>🔒 Verlauf nur zum Lesen:</b> Schnappschüsse früherer Runden sperren jetzt Ziehen und Kontextmenü-Bearbeitungen, damit die aktuelle Partie beim Nachsehen unverändert bleibt.',
          '<b>🛡️ Robustere Sitzungen:</b> Die Partie aus Runde eins wird nach dem Neuladen bis zu zwei Stunden wiederhergestellt; beschädigte Browserdaten werden sicher behandelt.',
          '<b>🔄 Besserer Partiewechsel:</b> Neues Spiel setzt den Impostor-Modus und verbündete Impostoren zurück, behält aber die aktive Lobby-Aufstellung bei.',
          '<b>🎭 Einheitliche Impostor-Rollen:</b> Bestätigte Impostor-Rollen landen jetzt korrekt in der Spalte für verbündete Impostoren.',
          '<b>🌐 Übersetzte Aufgaben und Orte:</b> Offizielle Namen sind in allen sechs unterstützten Sprachen verfügbar; „tan“ heißt auf pt-BR „Cáqui“.',
          '<b>🎙️ Spracheingabe:</b> Die Erkennungssprache richtet sich standardmäßig nach der Browsersprache; ein eigener Sprachwähler und Berechtigungssteuerungen sind hinzugekommen.',
          '<b>🍪 Klarerer Datenschutzhinweis:</b> Der Hinweis nennt die in der Produktionsumgebung gesendeten Analyse- und Diagnosedaten und verlinkt die Datenschutzerklärung.',
          '<b>📱 Bessere Lobby auf Mobilgeräten:</b> Der Farbwähler bleibt auf schmalen Bildschirmen im sichtbaren Bereich; Besprechungszähler werden manuell eingegeben.',
        ],
      },
      {
        date: '2026-09-20',
        title: 'v2.1 — Leistung, Tastenkürzel und Hilfe',
        changes: [
          '<b>⚡ Leistung:</b> Eine neue Einstellung schaltet Animationen aus und verringert Bewegungen in der Oberfläche.',
          '<b>📚 Hilfe überarbeitet:</b> Das Hilfefenster wurde neu angeordnet und um Hinweise zu Lobby, Impostor-Modus und Tastenkürzeln erweitert.',
          '<b>⌨️ Tastenkürzel:</b> Schneller Zugriff auf Notizen (N), Karte (M), Aufgaben (T), Impostor-Modus (I), Spielerliste (L) und Schließen oder Minimieren (Esc).',
          '<b>📜 Credits und Haftungshinweis:</b> Urheberangaben präzisiert, Anzeige des archivierten Originalbriefs ergänzt und Zweck der Spenden erläutert.',
          '<b>🌐 Sprachen:</b> Die Hauptoberfläche wurde in alle sechs unterstützten Sprachen übersetzt.',
        ],
      },
    ],
    olderEntriesNotice: 'Ältere Versionshinweise werden auf Englisch angezeigt.',
  },
  'ko-KR': {
    entries: [
      {
        date: '2026-10-28',
        title: 'v2.5 — 타이머, 개인정보 선택 및 일주일간의 수정',
        changes: [
          '<b>⏱️ 타이머와 스톱워치:</b> 킬 쿨다운, 토론, 사보타주용 어몽어스 프리셋이 있는 하단 독 타이머와 메모에 기록할 수 있는 스톱워치가 추가되었습니다. S 키로 엽니다.',
          '<b>🍪 분석 여부는 직접 선택:</b> Google Analytics는 허용한 뒤에만 로드됩니다. 개인정보 페이지에서 언제든지 선택을 바꿀 수 있으며, 이 페이지는 이제 오류 보고도 정확하게 설명합니다.',
          '<b>💾 더 많이 기억:</b> 선택한 맵과 모든 설정이 방문 사이에 유지되며, 이전 버전 앱의 설정도 이어집니다.',
          '<b>🔄 예기치 않은 새로고침 없음:</b> 새 버전이 나오면 매치 중에 새로고침하지 않고 업데이트 전에 먼저 묻습니다.',
          '<b>🛰️ 추적자 역할:</b> 공식 추적자 역할 아이콘이 추가되었습니다.',
          '<b>♿ 접근성과 모바일:</b> 로스터와 대화 상자를 키보드로 사용할 수 있으며, 버튼과 하단 독이 노치와 홈 바에 가려지지 않습니다.',
          '<b>🐛 수정 사항:</b> 단축키가 Ctrl, Cmd, Alt 조합에 더 이상 반응하지 않고, 입력 중 Esc가 올바르게 동작하며, 받아쓰기에서 “enter”는 단어 전체만 인식하고, 더 많은 페이지가 번역되었습니다.',
        ],
      },
      {
        date: '2026-10-04',
        title: 'v2.4 — 전술 투표 경고 및 매치 임포스터 설정',
        changes: [
          '<b>🚨 전술 투표 경고:</b> 더블킬 위험, 매치 포인트 또는 스킵이 수학적으로 안전한 순간을 회의 중 실시간으로 안내합니다.',
          '<b>👾 매치 임포스터 선택:</b> 로비 바에서 매치 임포스터 수(1, 2 또는 3명)를 빠르게 설정할 수 있으며, 로비 인원에 따라 동적으로 제한됩니다.',
        ],
      },
      {
        date: '2026-09-23',
        title: 'v2.3 — 라이트 모드',
        changes: [
          '<b>☀️ 라이트 모드:</b> 모든 보드, 팝오버, 탐정 메모장과 대화 상자가 라이트 모드를 지원하며, 색상 이름과 보조 색상의 대비가 개선되었습니다.',
        ],
      },
      {
        date: '2026-09-21',
        title: 'v2.2 — 조사 기록 안정성과 사용성 개선',
        changes: [
          '<b>🔒 읽기 전용 기록 스냅샷:</b> 이전 라운드 스냅샷에서 드래그 이동과 메뉴 편집을 잠가, 기록을 확인할 때 현재 게임 데이터가 바뀌지 않도록 했습니다.',
          '<b>🛡️ 세션 안정성 개선:</b> 첫 라운드의 게임은 새로고침 후 최대 두 시간 동안 복원되며, 손상된 브라우저 저장 데이터도 안전하게 처리합니다.',
          '<b>🔄 새 게임 초기화 개선:</b> 새 게임을 시작하면 임포스터 모드와 같은 팀 임포스터 정보가 초기화되고, 현재 로비 인원은 유지됩니다.',
          '<b>🎭 일관된 임포스터 역할:</b> 확인된 임포스터 역할이 같은 팀 임포스터 열로 올바르게 이동합니다.',
          '<b>🌐 임무 및 장소 번역:</b> 지원하는 여섯 언어로 공식 이름을 표시합니다. pt-BR에서는 황갈색을 “Cáqui”로 번역했습니다.',
          '<b>🎙️ 음성 입력 설정:</b> 기본 음성 인식 언어가 브라우저 언어를 따르며, 전용 언어 선택기와 권한 제어 기능이 추가되었습니다.',
          '<b>🍪 더 명확한 개인정보 안내:</b> 운영 환경에서 전송되는 분석 및 진단 데이터를 밝히고 개인정보 처리방침으로 연결합니다.',
          '<b>📱 모바일 로비 개선:</b> 좁은 화면에서도 색상 선택기가 화면 밖으로 나가지 않으며, 회의 횟수는 직접 입력합니다.',
        ],
      },
      {
        date: '2026-09-20',
        title: 'v2.1 — 성능, 단축키 및 도움말 개선',
        changes: [
          '<b>⚡ 성능:</b> 설정에서 애니메이션을 끄고 인터페이스의 움직임을 줄일 수 있습니다.',
          '<b>📚 도움말 개편:</b> 도움말 화면을 재구성하고 로비 설정, 임포스터 모드, 단축키 설명을 보강했습니다.',
          '<b>⌨️ 키보드 단축키:</b> 메모(N), 지도(M), 임무(T), 임포스터 모드(I), 플레이어 목록(L), 닫기 또는 최소화(Esc)에 빠르게 접근할 수 있습니다.',
          '<b>📜 제작자 정보 및 안내:</b> 제작자 정보를 명확히 하고, 보관된 원본 편지 보기와 기부금 안내를 추가했습니다.',
          '<b>🌐 언어 지원:</b> 기본 인터페이스를 지원하는 여섯 언어로 번역했습니다.',
        ],
      },
    ],
    olderEntriesNotice: '이전 버전의 변경 사항은 영어로 표시됩니다.',
  },
}
