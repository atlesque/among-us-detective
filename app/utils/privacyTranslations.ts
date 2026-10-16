import type { SupportedLocale } from '~/utils/translations'

export interface PrivacySection {
  heading: string
  paragraphs: string[]
  links?: { label: string; href: string }[]
  /** Shows the Google Analytics allow/decline control in this section */
  analyticsConsent?: boolean
}

export interface PrivacyPageCopy {
  back: string
  title: string
  intro: string
  sections: PrivacySection[]
  consent: {
    granted: string
    denied: string
    unset: string
    allow: string
    revoke: string
  }
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
        analyticsConsent: true,
        paragraphs: [
          'Google Analytics only loads after you allow it, and you can change your choice at any time.',
          'In production, Google Analytics 4 records page views and selected app actions, such as starting a match or round and opening tools or settings. It also collects standard browser, device, and usage data; identifiers or cookies may be used to measure visits.',
        ],
        links: [{ label: 'Google Analytics privacy information', href: 'https://policies.google.com/privacy' }],
      },
      {
        heading: 'Errors, performance, and logs',
        paragraphs: [
          'In production, Sentry is configured in the browser to receive error reports and performance traces; log sending is enabled in its configuration. Performance tracing is configured to sample 10% of transactions. Session Replay is turned off, so your screen and page interactions are not recorded.',
          'Sentry is configured not to send personal data, so reports do not include your IP address or other user details. They may still include technical details such as your browser, device, the page address, and the error message.',
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
    consent: {
      granted: 'Analytics is allowed.',
      denied: 'Analytics is turned off.',
      unset: 'You haven’t chosen yet, so analytics is off.',
      allow: 'Allow analytics',
      revoke: 'Turn off analytics',
    },
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
        analyticsConsent: true,
        paragraphs: [
          'O Google Analytics só é carregado depois que você permitir, e você pode mudar sua escolha a qualquer momento.',
          'Em produção, o Google Analytics 4 registra visualizações de páginas e algumas ações no aplicativo, como iniciar uma partida ou rodada e abrir ferramentas ou configurações. Ele também coleta dados usuais de navegador, dispositivo e uso; identificadores ou cookies podem ser usados para medir visitas.',
        ],
        links: [{ label: 'Informações de privacidade do Google Analytics', href: 'https://policies.google.com/privacy' }],
      },
      {
        heading: 'Erros, desempenho e registros',
        paragraphs: [
          'Em produção, o Sentry está configurado no navegador para receber relatórios de erros e rastreamentos de desempenho; o envio de registros está habilitado na configuração. O rastreamento de desempenho está configurado para incluir 10% das transações. A reprodução de sessão está desativada, então sua tela e suas interações com a página não são gravadas.',
          'O Sentry está configurado para não enviar dados pessoais, então os relatórios não incluem seu endereço IP nem outros dados de usuário. Eles ainda podem incluir detalhes técnicos, como seu navegador, dispositivo, o endereço da página e a mensagem de erro.',
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
    consent: {
      granted: 'A análise está permitida.',
      denied: 'A análise está desativada.',
      unset: 'Você ainda não escolheu, então a análise está desativada.',
      allow: 'Permitir análise',
      revoke: 'Desativar análise',
    },
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
        analyticsConsent: true,
        paragraphs: [
          'Google Analytics solo se carga después de que lo permitas, y puedes cambiar tu elección en cualquier momento.',
          'En producción, Google Analytics 4 registra las visitas a páginas y algunas acciones de la aplicación, como iniciar una partida o ronda y abrir herramientas o ajustes. También recopila datos habituales del navegador, el dispositivo y el uso; puede usar identificadores o cookies para medir las visitas.',
        ],
        links: [{ label: 'Información de privacidad de Google Analytics', href: 'https://policies.google.com/privacy' }],
      },
      {
        heading: 'Errores, rendimiento y registros',
        paragraphs: [
          'En producción, Sentry está configurado en el navegador para recibir informes de errores y trazas de rendimiento; el envío de registros está habilitado en su configuración. El rastreo de rendimiento está configurado para muestrear el 10 % de las transacciones. La reproducción de sesiones está desactivada, así que tu pantalla y tus interacciones con la página no se graban.',
          'Sentry está configurado para no enviar datos personales, así que los informes no incluyen tu dirección IP ni otros datos de usuario. Aun así, pueden incluir detalles técnicos como tu navegador, tu dispositivo, la dirección de la página y el mensaje de error.',
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
    consent: {
      granted: 'La analítica está permitida.',
      denied: 'La analítica está desactivada.',
      unset: 'Aún no has elegido, así que la analítica está desactivada.',
      allow: 'Permitir analítica',
      revoke: 'Desactivar analítica',
    },
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
        analyticsConsent: true,
        paragraphs: [
          'Google Analytics ne se charge qu’après votre autorisation, et vous pouvez modifier votre choix à tout moment.',
          'En production, Google Analytics 4 enregistre les pages consultées et certaines actions dans l’application, comme le démarrage d’une partie ou d’une manche et l’ouverture d’outils ou des paramètres. Il recueille aussi des données habituelles sur le navigateur, l’appareil et l’utilisation ; des identifiants ou des cookies peuvent servir à mesurer les visites.',
        ],
        links: [{ label: 'Informations sur la confidentialité de Google Analytics', href: 'https://policies.google.com/privacy' }],
      },
      {
        heading: 'Erreurs, performances et journaux',
        paragraphs: [
          'En production, Sentry est configuré dans le navigateur pour recevoir les rapports d’erreur et les traces de performance ; l’envoi des journaux est activé dans sa configuration. Le traçage des performances est configuré pour échantillonner 10 % des transactions. La relecture de session est désactivée : votre écran et vos interactions avec la page ne sont pas enregistrés.',
          'Sentry est configuré pour ne pas envoyer de données personnelles : les rapports ne contiennent ni votre adresse IP ni d’autres informations utilisateur. Ils peuvent tout de même contenir des détails techniques comme votre navigateur, votre appareil, l’adresse de la page et le message d’erreur.',
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
    consent: {
      granted: 'L’analyse est autorisée.',
      denied: 'L’analyse est désactivée.',
      unset: 'Vous n’avez pas encore choisi, l’analyse est donc désactivée.',
      allow: 'Autoriser l’analyse',
      revoke: 'Désactiver l’analyse',
    },
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
        analyticsConsent: true,
        paragraphs: [
          'Google Analytics wird erst geladen, nachdem du es erlaubt hast, und du kannst deine Wahl jederzeit ändern.',
          'In der Produktionsumgebung erfasst Google Analytics 4 Seitenaufrufe und ausgewählte Aktionen in der App, etwa das Starten eines Spiels oder einer Runde sowie das Öffnen von Werkzeugen oder Einstellungen. Außerdem werden übliche Browser-, Geräte- und Nutzungsdaten erfasst; Kennungen oder Cookies können zur Messung von Besuchen dienen.',
        ],
        links: [{ label: 'Datenschutzinformationen zu Google Analytics', href: 'https://policies.google.com/privacy' }],
      },
      {
        heading: 'Fehler, Leistung und Protokolle',
        paragraphs: [
          'In der Produktionsumgebung ist Sentry im Browser so konfiguriert, dass Fehlerberichte und Leistungstraces empfangen werden; das Senden von Protokollen ist in der Konfiguration aktiviert. Das Performance-Tracing ist so konfiguriert, dass 10 % der Transaktionen erfasst werden. Session Replay ist deaktiviert, dein Bildschirm und deine Interaktionen mit der Seite werden also nicht aufgezeichnet.',
          'Sentry ist so konfiguriert, dass keine personenbezogenen Daten gesendet werden. Berichte enthalten daher weder deine IP-Adresse noch andere Benutzerangaben. Sie können aber technische Details wie deinen Browser, dein Gerät, die Seitenadresse und die Fehlermeldung enthalten.',
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
    consent: {
      granted: 'Analyse ist erlaubt.',
      denied: 'Analyse ist ausgeschaltet.',
      unset: 'Du hast noch nicht gewählt, daher ist die Analyse ausgeschaltet.',
      allow: 'Analyse erlauben',
      revoke: 'Analyse ausschalten',
    },
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
        analyticsConsent: true,
        paragraphs: [
          'Google Analytics는 사용자가 허용한 후에만 로드되며, 언제든지 선택을 변경할 수 있습니다.',
          '운영 환경에서 Google Analytics 4는 페이지 조회와 일부 앱 동작을 기록합니다. 여기에는 게임이나 라운드 시작, 도구 또는 설정 열기가 포함됩니다. 일반적인 브라우저, 기기 및 사용 데이터도 수집하며, 방문을 측정하기 위해 식별자나 쿠키를 사용할 수 있습니다.',
        ],
        links: [{ label: 'Google Analytics 개인정보 안내', href: 'https://policies.google.com/privacy' }],
      },
      {
        heading: '오류, 성능 및 로그',
        paragraphs: [
          '운영 환경에서 Sentry는 브라우저에서 오류 보고서와 성능 추적 정보를 받도록 설정되어 있으며, 로그 전송도 설정에서 활성화되어 있습니다. 성능 추적은 트랜잭션의 10%를 샘플링하도록 설정되어 있습니다. 세션 재생은 꺼져 있으므로 화면과 페이지 상호작용은 기록되지 않습니다.',
          'Sentry는 개인 정보를 보내지 않도록 설정되어 있으므로 보고서에는 IP 주소나 기타 사용자 정보가 포함되지 않습니다. 다만 브라우저, 기기, 페이지 주소, 오류 메시지와 같은 기술 정보는 포함될 수 있습니다.',
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
    consent: {
      granted: '분석이 허용되었습니다.',
      denied: '분석이 꺼져 있습니다.',
      unset: '아직 선택하지 않아 분석이 꺼져 있습니다.',
      allow: '분석 허용',
      revoke: '분석 끄기',
    },
  },
}
