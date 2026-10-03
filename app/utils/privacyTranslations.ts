import type { SupportedLocale } from '~/utils/translations'

export interface PrivacySection {
  heading: string
  paragraphs: string[]
  links?: { label: string; href: string }[]
}

export interface PrivacyPageCopy {
  back: string
  title: string
  intro: string
  sections: PrivacySection[]
}

export const privacyTranslations: Record<SupportedLocale, PrivacyPageCopy> = {
  'en-US': {
    back: 'Back to the app',
    title: 'Privacy & Data Use',
    intro: 'Among Us Detective stores game data in your browser. In production, it also sends usage and diagnostic data to Google Analytics and Sentry as described below.',
    sections: [
      {
        heading: 'Game data stored in your browser',
        paragraphs: [
          'The app saves your board, notes, and preferences in this browser so they persist between visits. Clearing this site’s browser data removes them. This app storage is separate from the analytics and diagnostics described below.',
        ],
      },
      {
        heading: 'Usage analytics',
        paragraphs: [
          'In production, Google Analytics 4 records page views and selected app actions, such as starting a match or round and opening tools or settings. It also collects standard browser, device, and usage data; identifiers or cookies may be used to measure visits.',
        ],
        links: [{ label: 'Google Analytics privacy information', href: 'https://policies.google.com/privacy' }],
      },
      {
        heading: 'Errors, performance, logs, and replay',
        paragraphs: [
          'In production, Sentry is configured in the browser and on the server to receive error reports and performance traces; log sending is enabled in its configuration. Performance tracing is configured to sample 100% of transactions. Session Replay is configured to sample 10% of browser sessions and 100% of sessions with an error.',
          'Both Sentry configurations enable automatic personal data collection. Error and tracing reports may therefore include IP addresses and other automatically available user or request details. Replays may record page interactions and content according to Sentry’s replay settings.',
        ],
        links: [{ label: 'Sentry privacy information', href: 'https://sentry.io/privacy/' }],
      },
      {
        heading: 'Voice input',
        paragraphs: [
          'When you activate voice input in Notes, your browser’s speech recognition service turns audio into text. Depending on your browser and device, audio may be sent to that provider for processing. Check the provider’s privacy information for details. The resulting transcript is added to your note.',
        ],
      },
      {
        heading: 'Data handling by providers',
        paragraphs: [
          'See each provider’s privacy information for how telemetry is handled and retained.',
        ],
      },
    ],
  },
  'pt-BR': {
    back: 'Voltar ao aplicativo',
    title: 'Privacidade e uso de dados',
    intro: 'Among Us Detective armazena dados da partida no seu navegador. Em produção, também envia dados de uso e diagnóstico ao Google Analytics e ao Sentry, conforme descrito abaixo.',
    sections: [
      {
        heading: 'Dados da partida armazenados no navegador',
        paragraphs: [
          'O aplicativo salva seu tabuleiro, suas notas e suas preferências neste navegador para mantê-los entre visitas. Limpar os dados deste site no navegador os remove. Esse armazenamento é separado dos dados de análise e diagnóstico descritos abaixo.',
        ],
      },
      {
        heading: 'Análise de uso',
        paragraphs: [
          'Em produção, o Google Analytics 4 registra visualizações de páginas e algumas ações no aplicativo, como iniciar uma partida ou rodada e abrir ferramentas ou configurações. Ele também coleta dados usuais de navegador, dispositivo e uso; identificadores ou cookies podem ser usados para medir visitas.',
        ],
        links: [{ label: 'Informações de privacidade do Google Analytics', href: 'https://policies.google.com/privacy' }],
      },
      {
        heading: 'Erros, desempenho, registros e reprodução de sessão',
        paragraphs: [
          'Em produção, o Sentry está configurado no navegador e no servidor para receber relatórios de erros e rastreamentos de desempenho; o envio de registros está habilitado na configuração. O rastreamento de desempenho está configurado para incluir 100% das transações. A reprodução de sessão está configurada para incluir 10% das sessões do navegador e 100% das sessões com um erro.',
          'As duas configurações do Sentry permitem a coleta automática de dados pessoais. Por isso, relatórios de erros e rastreamentos podem incluir endereços IP e outros dados de usuário ou solicitação disponíveis automaticamente. As reproduções podem registrar interações e conteúdo da página conforme as configurações do Sentry.',
        ],
        links: [{ label: 'Informações de privacidade do Sentry', href: 'https://sentry.io/privacy/' }],
      },
      {
        heading: 'Entrada por voz',
        paragraphs: [
          'Ao ativar a entrada por voz em Notas, o serviço de reconhecimento de fala do navegador transforma o áudio em texto. Dependendo do navegador e do dispositivo, o áudio pode ser enviado ao provedor para processamento. Consulte as informações de privacidade do provedor. A transcrição resultante é adicionada à sua nota.',
        ],
      },
      {
        heading: 'Tratamento de dados pelos provedores',
        paragraphs: [
          'Consulte as informações de privacidade de cada provedor para saber como os dados de telemetria são tratados e retidos.',
        ],
      },
    ],
  },
  'es-ES': {
    back: 'Volver a la aplicación',
    title: 'Privacidad y uso de datos',
    intro: 'Among Us Detective guarda los datos de la partida en tu navegador. En producción también envía datos de uso y diagnóstico a Google Analytics y Sentry, como se explica a continuación.',
    sections: [
      {
        heading: 'Datos de la partida guardados en tu navegador',
        paragraphs: [
          'La aplicación guarda el tablero, las notas y las preferencias en este navegador para conservarlos entre visitas. Si borras los datos de este sitio en el navegador, se eliminarán. Este almacenamiento de la aplicación es independiente de los datos analíticos y de diagnóstico descritos a continuación.',
        ],
      },
      {
        heading: 'Analítica de uso',
        paragraphs: [
          'En producción, Google Analytics 4 registra las visitas a páginas y algunas acciones de la aplicación, como iniciar una partida o ronda y abrir herramientas o ajustes. También recopila datos habituales del navegador, el dispositivo y el uso; puede usar identificadores o cookies para medir las visitas.',
        ],
        links: [{ label: 'Información de privacidad de Google Analytics', href: 'https://policies.google.com/privacy' }],
      },
      {
        heading: 'Errores, rendimiento, registros y reproducción',
        paragraphs: [
          'En producción, Sentry está configurado en el navegador y en el servidor para recibir informes de errores y trazas de rendimiento; el envío de registros está habilitado en su configuración. El rastreo de rendimiento está configurado para muestrear el 100 % de las transacciones. La reproducción de sesiones está configurada para muestrear el 10 % de las sesiones del navegador y el 100 % de las sesiones con un error.',
          'Ambas configuraciones de Sentry permiten la recopilación automática de datos personales. Por ello, los informes de errores y las trazas pueden incluir direcciones IP y otros datos de usuario o de solicitud disponibles automáticamente. Las reproducciones pueden registrar interacciones y contenido de la página según los ajustes de Sentry.',
        ],
        links: [{ label: 'Información de privacidad de Sentry', href: 'https://sentry.io/privacy/' }],
      },
      {
        heading: 'Entrada por voz',
        paragraphs: [
          'Al activar la entrada por voz en Notas, el servicio de reconocimiento de voz del navegador convierte el audio en texto. Según el navegador y el dispositivo, el audio puede enviarse al proveedor para su procesamiento. Consulta la información de privacidad del proveedor. La transcripción resultante se añade a tu nota.',
        ],
      },
      {
        heading: 'Tratamiento de datos por los proveedores',
        paragraphs: [
          'Consulta la información de privacidad de cada proveedor para saber cómo se gestionan y conservan los datos de telemetría.',
        ],
      },
    ],
  },
  'fr-FR': {
    back: 'Retour à l’application',
    title: 'Confidentialité et utilisation des données',
    intro: 'Among Us Detective enregistre les données de partie dans votre navigateur. En production, l’application envoie aussi des données d’utilisation et de diagnostic à Google Analytics et Sentry, comme décrit ci-dessous.',
    sections: [
      {
        heading: 'Données de partie stockées dans votre navigateur',
        paragraphs: [
          'L’application enregistre votre tableau, vos notes et vos préférences dans ce navigateur afin de les conserver entre vos visites. Effacer les données de ce site dans le navigateur les supprime. Ce stockage de l’application est distinct des données d’analyse et de diagnostic décrites ci-dessous.',
        ],
      },
      {
        heading: 'Analyse de l’utilisation',
        paragraphs: [
          'En production, Google Analytics 4 enregistre les pages consultées et certaines actions dans l’application, comme le démarrage d’une partie ou d’une manche et l’ouverture d’outils ou des paramètres. Il recueille aussi des données habituelles sur le navigateur, l’appareil et l’utilisation ; des identifiants ou des cookies peuvent servir à mesurer les visites.',
        ],
        links: [{ label: 'Informations sur la confidentialité de Google Analytics', href: 'https://policies.google.com/privacy' }],
      },
      {
        heading: 'Erreurs, performances, journaux et relecture',
        paragraphs: [
          'En production, Sentry est configuré dans le navigateur et sur le serveur pour recevoir les rapports d’erreur et les traces de performance ; l’envoi des journaux est activé dans sa configuration. Le traçage des performances est configuré pour échantillonner 100 % des transactions. La relecture de session est configurée pour échantillonner 10 % des sessions du navigateur et 100 % des sessions avec une erreur.',
          'Les deux configurations Sentry autorisent la collecte automatique de données personnelles. Les rapports d’erreur et les traces peuvent donc contenir des adresses IP et d’autres informations utilisateur ou de requête disponibles automatiquement. Les relectures peuvent enregistrer des interactions et du contenu de page selon les paramètres de relecture de Sentry.',
        ],
        links: [{ label: 'Informations sur la confidentialité de Sentry', href: 'https://sentry.io/privacy/' }],
      },
      {
        heading: 'Saisie vocale',
        paragraphs: [
          'Lorsque vous activez la saisie vocale dans Notes, le service de reconnaissance vocale de votre navigateur convertit l’audio en texte. Selon le navigateur et l’appareil, l’audio peut être envoyé à son fournisseur pour traitement. Consultez les informations de confidentialité de ce fournisseur. La transcription obtenue est ajoutée à votre note.',
        ],
      },
      {
        heading: 'Traitement des données par les fournisseurs',
        paragraphs: [
          'Consultez les informations de confidentialité de chaque fournisseur pour savoir comment les données de télémétrie sont traitées et conservées.',
        ],
      },
    ],
  },
  'de-DE': {
    back: 'Zurück zur App',
    title: 'Datenschutz und Datennutzung',
    intro: 'Among Us Detective speichert Spieldaten in deinem Browser. In der Produktionsumgebung werden außerdem Nutzungs- und Diagnosedaten wie unten beschrieben an Google Analytics und Sentry gesendet.',
    sections: [
      {
        heading: 'Im Browser gespeicherte Spieldaten',
        paragraphs: [
          'Die App speichert dein Spielfeld, deine Notizen und deine Einstellungen in diesem Browser, damit sie bei späteren Besuchen erhalten bleiben. Wenn du die Browserdaten dieser Website löschst, werden auch diese Daten entfernt. Dieser App-Speicher ist von den unten beschriebenen Analyse- und Diagnosedaten getrennt.',
        ],
      },
      {
        heading: 'Nutzungsanalyse',
        paragraphs: [
          'In der Produktionsumgebung erfasst Google Analytics 4 Seitenaufrufe und ausgewählte Aktionen in der App, etwa das Starten eines Spiels oder einer Runde sowie das Öffnen von Werkzeugen oder Einstellungen. Außerdem werden übliche Browser-, Geräte- und Nutzungsdaten erfasst; Kennungen oder Cookies können zur Messung von Besuchen dienen.',
        ],
        links: [{ label: 'Datenschutzinformationen zu Google Analytics', href: 'https://policies.google.com/privacy' }],
      },
      {
        heading: 'Fehler, Leistung, Protokolle und Wiedergaben',
        paragraphs: [
          'In der Produktionsumgebung ist Sentry im Browser und auf dem Server so konfiguriert, dass Fehlerberichte und Leistungstraces empfangen werden; das Senden von Protokollen ist in der Konfiguration aktiviert. Das Performance-Tracing ist so konfiguriert, dass 100 % der Transaktionen erfasst werden. Session Replay ist so konfiguriert, dass 10 % der Browser-Sitzungen und 100 % der Sitzungen mit einem Fehler erfasst werden.',
          'Beide Sentry-Konfigurationen erlauben die automatische Erfassung personenbezogener Daten. Fehlerberichte und Traces können daher IP-Adressen und andere automatisch verfügbare Benutzer- oder Anfrageinformationen enthalten. Wiedergaben können gemäß den Replay-Einstellungen von Sentry Seiteninteraktionen und Inhalte aufzeichnen.',
        ],
        links: [{ label: 'Datenschutzinformationen zu Sentry', href: 'https://sentry.io/privacy/' }],
      },
      {
        heading: 'Spracheingabe',
        paragraphs: [
          'Wenn du die Spracheingabe in den Notizen aktivierst, wandelt der Spracherkennungsdienst deines Browsers Audio in Text um. Je nach Browser und Gerät kann Audio zur Verarbeitung an den jeweiligen Anbieter gesendet werden. Informiere dich dazu in den Datenschutzinformationen des Anbieters. Das erkannte Transkript wird deiner Notiz hinzugefügt.',
        ],
      },
      {
        heading: 'Datenverarbeitung durch Anbieter',
        paragraphs: [
          'In den Datenschutzinformationen der Anbieter erfährst du, wie Telemetriedaten verarbeitet und gespeichert werden.',
        ],
      },
    ],
  },
  'ko-KR': {
    back: '앱으로 돌아가기',
    title: '개인정보 및 데이터 사용',
    intro: 'Among Us Detective는 게임 데이터를 브라우저에 저장합니다. 운영 환경에서는 아래 설명과 같이 사용 및 진단 데이터도 Google Analytics와 Sentry로 전송합니다.',
    sections: [
      {
        heading: '브라우저에 저장되는 게임 데이터',
        paragraphs: [
          '앱은 방문 후에도 유지되도록 보드, 메모, 설정을 이 브라우저에 저장합니다. 브라우저에서 이 사이트의 데이터를 지우면 해당 데이터도 삭제됩니다. 앱 저장 데이터는 아래의 분석 및 진단 데이터와 별개입니다.',
        ],
      },
      {
        heading: '사용 분석',
        paragraphs: [
          '운영 환경에서 Google Analytics 4는 페이지 조회와 일부 앱 동작을 기록합니다. 여기에는 게임이나 라운드 시작, 도구 또는 설정 열기가 포함됩니다. 일반적인 브라우저, 기기 및 사용 데이터도 수집하며, 방문을 측정하기 위해 식별자나 쿠키를 사용할 수 있습니다.',
        ],
        links: [{ label: 'Google Analytics 개인정보 안내', href: 'https://policies.google.com/privacy' }],
      },
      {
        heading: '오류, 성능, 로그 및 세션 재생',
        paragraphs: [
          '운영 환경에서 Sentry는 브라우저와 서버에서 오류 보고서와 성능 추적 정보를 받도록 설정되어 있으며, 로그 전송도 설정에서 활성화되어 있습니다. 성능 추적은 트랜잭션의 100%를 샘플링하도록 설정되어 있습니다. 세션 재생은 브라우저 세션의 10%, 오류가 발생한 세션의 100%를 샘플링하도록 설정되어 있습니다.',
          '두 Sentry 설정 모두 개인 정보의 자동 수집을 허용합니다. 따라서 오류 보고서와 추적 정보에 IP 주소 및 자동으로 수집 가능한 기타 사용자 또는 요청 정보가 포함될 수 있습니다. 세션 재생에는 Sentry 재생 설정에 따라 페이지 상호작용과 콘텐츠가 기록될 수 있습니다.',
        ],
        links: [{ label: 'Sentry 개인정보 안내', href: 'https://sentry.io/privacy/' }],
      },
      {
        heading: '음성 입력',
        paragraphs: [
          '메모에서 음성 입력을 켜면 브라우저의 음성 인식 서비스가 오디오를 텍스트로 변환합니다. 브라우저와 기기에 따라 처리를 위해 오디오가 해당 서비스 제공업체로 전송될 수 있습니다. 자세한 내용은 제공업체의 개인정보 안내를 확인하세요. 변환된 텍스트는 메모에 추가됩니다.',
        ],
      },
      {
        heading: '서비스 제공업체의 데이터 처리',
        paragraphs: [
          '텔레메트리 데이터의 처리 및 보관 방식은 각 서비스 제공업체의 개인정보 안내를 확인하세요.',
        ],
      },
    ],
  },
}
