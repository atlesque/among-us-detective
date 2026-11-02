import type { SupportedLocale } from '~/utils/translations'

export interface OriginalLetterCopy {
  notice: string
  greeting: string
  paragraphsBeforeContact: string[]
  contactPrefix: string
  contactSuffix: string
  closingParagraph: string
  signOff: string
  signature: string
}

export const originalLetterTranslations: Record<SupportedLocale, OriginalLetterCopy> = {
  'en-US': {
    notice: 'Translated from the creator’s archived letter; its claims reflect what the author wrote at the time.',
    greeting: "Hi, I'm Alex, also known as Atlesque.",
    paragraphsBeforeContact: [
      'Thank you for using this tool. I initially made it to help myself remember things while playing, but decided to release it for free so other people could enjoy it.',
      'There has been some controversy about whether this tool is a hack or a way of cheating.',
      'Let me start by sincerely apologizing for giving you the wrong impression: I never intended to create anything that would ruin the game for anyone. After all, Among Us is a fantastic game that deserves great players like yourself!',
      'But I do understand why you might think this gives you an unfair advantage. The fact is: this is an external tool that lets you do things the game does not normally permit, like taking notes. So yes, it does get awfully close to cheat territory!',
      'However, from a technical point of view, this tool does not alter anything in the game. Unlike a hack which modifies the game client or a glitch which abuses the game’s mechanics, this tool only allows you to keep track of things you’ve seen during your game. Therefore it is completely safe, legal and will not get you banned.',
      'In fact, it is nothing more than a “smart” notepad. You could also use pen and paper, or Excel, to create the exact same thing.',
      'Does it spoil the fun for others? Let’s consider: Does it really matter that you are confident in who or what you saw, if your crew doesn’t believe you?',
      'The biggest challenge of this game is not memorizing things, but convincing others you are right. If your crew doesn’t believe you, it doesn’t matter if you have perfect memory; no one will vote with you. And unfortunately, there is no tool for convincing people yet 🙂',
      'For people like me who have a bad visual memory or are just starting out, this tool has proven to be a helpful little aid. It has brought back the fun by giving us more confidence in what we see and letting us focus more on other gameplay mechanics.',
    ],
    contactPrefix: 'If you’re still convinced this tool violates any rules, policies, or legal agreements, please don’t hesitate to contact me by email at ',
    contactSuffix: '. I promise to take any inquiry seriously and take appropriate action if necessary.',
    closingParagraph: 'For everyone else, I really hope you enjoy this tool and the game. If you have feedback or suggestions, you’re always welcome to get in touch! Many feature suggestions have come from users like you, and I heartily appreciate it.',
    signOff: 'With metta,',
    signature: '- Alex',
  },
  'pt-BR': {
    notice: 'Tradução da carta arquivada do criador; as afirmações refletem o que o autor escreveu na época.',
    greeting: 'Olá, sou Alex, também conhecido como Atlesque.',
    paragraphsBeforeContact: [
      'Obrigado por usar esta ferramenta. Criei-a inicialmente para me ajudar a lembrar das coisas enquanto jogava, mas decidi disponibilizá-la gratuitamente para que outras pessoas também pudessem aproveitá-la.',
      'Houve alguma controvérsia sobre se esta ferramenta é um hack ou uma forma de trapacear.',
      'Quero começar pedindo desculpas sinceras por ter passado uma impressão errada: nunca tive a intenção de criar algo que estragasse a partida de alguém. Afinal, Among Us é um jogo fantástico, que merece jogadores excelentes como você!',
      'Mas entendo por que você pode achar que isto oferece uma vantagem injusta. O fato é que esta ferramenta externa permite fazer coisas que o jogo normalmente não permite, como tomar notas. Então, sim, ela chega bem perto da linha da trapaça!',
      'Porém, do ponto de vista técnico, esta ferramenta não altera nada no jogo. Ao contrário de um hack, que modifica o cliente do jogo, ou de uma falha que explora as mecânicas do jogo, ela apenas permite acompanhar o que você observou durante a partida. Portanto, é completamente segura, legal e não fará com que você seja banido.',
      'Na verdade, não passa de um bloco de notas “inteligente”. Você também poderia usar papel e caneta ou o Excel para criar exatamente a mesma coisa.',
      'Isso estraga a diversão dos outros? Pense bem: importa mesmo ter certeza de quem ou do que você viu se sua tripulação não acreditar em você?',
      'O maior desafio do jogo não é memorizar as coisas, mas convencer os outros de que você está certo. Se sua tripulação não acredita em você, sua memória perfeita não importa; ninguém votará com você. E, infelizmente, ainda não existe ferramenta para convencer as pessoas 🙂',
      'Para pessoas como eu, que têm memória visual ruim ou estão começando agora, esta ferramenta tem sido uma ajudinha útil. Ela devolveu a diversão ao jogo, dando-nos mais confiança no que vemos e permitindo que nos concentremos em outras mecânicas.',
    ],
    contactPrefix: 'Se você ainda acredita que esta ferramenta viola alguma regra, política ou acordo legal, não hesite em falar comigo por e-mail: ',
    contactSuffix: '. Prometo levar qualquer questionamento a sério e tomar as medidas adequadas, se necessário.',
    closingParagraph: 'Para as demais pessoas, espero que aproveitem esta ferramenta e o jogo. Se tiverem comentários ou sugestões, fiquem à vontade para entrar em contato! Muitas sugestões de recursos vieram de usuários como vocês, e sou muito grato por isso.',
    signOff: 'Com metta,',
    signature: '- Alex',
  },
  'es-ES': {
    notice: 'Traducción de la carta archivada del creador; sus afirmaciones reflejan lo que escribió en su momento.',
    greeting: 'Hola, soy Alex, también conocido como Atlesque.',
    paragraphsBeforeContact: [
      'Gracias por usar esta herramienta. Al principio la hice para ayudarme a recordar cosas mientras jugaba, pero decidí publicarla gratis para que otras personas también pudieran disfrutarla.',
      'Ha habido cierta controversia sobre si esta herramienta es un hack o una forma de hacer trampas.',
      'Quiero empezar disculpándome sinceramente por haber dado una impresión equivocada: nunca pretendí crear algo que estropeara la partida a nadie. Al fin y al cabo, Among Us es un juego fantástico que merece jugadores estupendos como tú.',
      'Entiendo por qué podrías pensar que esto te da una ventaja injusta. Lo cierto es que se trata de una herramienta externa que permite hacer cosas que el juego normalmente no permite, como tomar notas. Así que sí, se acerca bastante al terreno de las trampas.',
      'Sin embargo, desde el punto de vista técnico, esta herramienta no modifica nada del juego. A diferencia de un hack, que modifica el cliente, o de un fallo que aprovecha las mecánicas del juego, solo te permite llevar un registro de lo que has visto durante la partida. Por eso es completamente segura y legal, y no hará que te expulsen del juego.',
      'En realidad, no es más que un bloc de notas “inteligente”. También podrías usar papel y bolígrafo o Excel para crear exactamente lo mismo.',
      '¿Le quita diversión a los demás? Pensemos: ¿de verdad importa que estés seguro de a quién o qué viste si tu tripulación no te cree?',
      'El mayor reto del juego no es memorizar cosas, sino convencer a los demás de que tienes razón. Si tu tripulación no te cree, da igual que tengas una memoria perfecta: nadie votará contigo. Y, por desgracia, todavía no existe ninguna herramienta para convencer a la gente 🙂',
      'Para personas como yo, con mala memoria visual o que acaban de empezar, esta herramienta ha sido una ayuda muy útil. Nos ha devuelto la diversión al darnos más confianza en lo que vemos y permitirnos centrarnos en otras mecánicas del juego.',
    ],
    contactPrefix: 'Si aún crees que esta herramienta incumple alguna norma, política o acuerdo legal, no dudes en escribirme por correo electrónico a ',
    contactSuffix: '. Te prometo que me tomaré en serio cualquier consulta y que tomaré las medidas oportunas si hace falta.',
    closingParagraph: 'A los demás, espero de verdad que disfrutéis de esta herramienta y del juego. Si tenéis comentarios o sugerencias, estaré encantado de que os pongáis en contacto. Muchas ideas para nuevas funciones han venido de usuarios como vosotros, y se lo agradezco de corazón.',
    signOff: 'Con metta,',
    signature: '- Alex',
  },
  'fr-FR': {
    notice: 'Traduction de la lettre archivée du créateur ; ses affirmations reflètent les propos de l’auteur à l’époque.',
    greeting: 'Bonjour, je m’appelle Alex, également connu sous le nom d’Atlesque.',
    paragraphsBeforeContact: [
      'Merci d’utiliser cet outil. Je l’ai d’abord créé pour m’aider à me souvenir de certaines choses en jouant, puis j’ai décidé de le proposer gratuitement afin que d’autres puissent aussi en profiter.',
      'Une controverse a eu lieu sur la question de savoir si cet outil est un hack ou une forme de triche.',
      'Je tiens à commencer par vous présenter mes sincères excuses si je vous ai donné une mauvaise impression : je n’ai jamais voulu créer quelque chose qui gâcherait la partie de qui que ce soit. Après tout, Among Us est un jeu formidable qui mérite des joueurs aussi excellents que vous !',
      'Je comprends toutefois que vous puissiez penser que cela vous donne un avantage injuste. En réalité, cet outil externe permet de faire des choses que le jeu ne permet pas normalement, comme prendre des notes. Alors oui, il frôle dangereusement la triche !',
      'Cependant, d’un point de vue technique, cet outil ne modifie rien dans le jeu. Contrairement à un hack qui modifie le client ou à un bug qui détourne les mécaniques du jeu, il permet seulement de garder une trace de ce que vous avez observé pendant la partie. Il est donc totalement sûr et légal, et ne vous fera pas bannir.',
      'En fait, ce n’est rien de plus qu’un bloc-notes « intelligent ». Vous pourriez aussi utiliser du papier et un stylo, ou Excel, pour faire exactement la même chose.',
      'Est-ce que cela gâche le plaisir des autres ? Réfléchissons : est-il vraiment important d’être sûr de ce que vous avez vu, ou de la personne que vous avez vue, si votre équipage ne vous croit pas ?',
      'Le plus grand défi de ce jeu n’est pas de mémoriser des choses, mais de convaincre les autres que vous avez raison. Si votre équipage ne vous croit pas, une mémoire parfaite ne change rien : personne ne votera avec vous. Et, malheureusement, il n’existe pas encore d’outil pour convaincre les gens 🙂',
      'Pour les personnes comme moi qui ont une mauvaise mémoire visuelle ou qui débutent, cet outil s’est révélé très utile. Il nous a redonné le plaisir de jouer en nous aidant à mieux faire confiance à ce que nous voyons et à nous concentrer sur d’autres mécaniques de jeu.',
    ],
    contactPrefix: 'Si vous pensez toujours que cet outil enfreint une règle, une politique ou un accord juridique, n’hésitez pas à me contacter par e-mail à l’adresse ',
    contactSuffix: '. Je vous promets de prendre toute demande au sérieux et d’agir de manière appropriée si nécessaire.',
    closingParagraph: 'Pour les autres, j’espère sincèrement que cet outil et le jeu vous plairont. N’hésitez pas à me contacter pour toute remarque ou suggestion ! De nombreuses idées de fonctionnalités viennent d’utilisateurs comme vous, et je leur en suis très reconnaissant.',
    signOff: 'Avec metta,',
    signature: '- Alex',
  },
  'de-DE': {
    notice: 'Übersetzung des archivierten Briefs des Erstellers; die Aussagen geben wieder, was der Autor damals geschrieben hat.',
    greeting: 'Hallo, ich bin Alex, auch bekannt als Atlesque.',
    paragraphsBeforeContact: [
      'Danke, dass du dieses Tool verwendest. Zunächst habe ich es erstellt, um mir beim Spielen Dinge besser merken zu können. Dann habe ich es kostenlos veröffentlicht, damit auch andere Freude daran haben.',
      'Es gab einige Diskussionen darüber, ob dieses Tool ein Hack oder eine Form des Betrugs ist.',
      'Zuerst möchte ich mich aufrichtig dafür entschuldigen, einen falschen Eindruck vermittelt zu haben: Ich wollte nie etwas schaffen, das jemandem die Partie verdirbt. Schließlich ist Among Us ein großartiges Spiel, das tolle Spieler wie dich verdient!',
      'Ich verstehe aber, warum du denken könntest, dass dir das einen unfairen Vorteil verschafft. Tatsächlich ist dies ein externes Tool, mit dem sich Dinge tun lassen, die das Spiel normalerweise nicht erlaubt, zum Beispiel Notizen machen. Ja, damit kommt es der Grenze zum Schummeln ziemlich nahe!',
      'Technisch gesehen verändert dieses Tool jedoch nichts im Spiel. Anders als ein Hack, der den Spielclient verändert, oder ein Fehler, der Spielmechaniken ausnutzt, hilft es dir nur dabei, Dinge festzuhalten, die du während der Partie beobachtet hast. Deshalb ist es völlig sicher und legal und führt nicht zu einem Ausschluss aus dem Spiel.',
      'Im Grunde ist es nichts weiter als ein „intelligenter“ Notizblock. Mit Stift und Papier oder Excel könntest du genau dasselbe machen.',
      'Nimmt es anderen den Spaß? Überlegen wir einmal: Ist es wirklich wichtig, dass du sicher bist, wen oder was du gesehen hast, wenn deine Crew dir nicht glaubt?',
      'Die größte Herausforderung in diesem Spiel ist nicht, sich Dinge zu merken, sondern andere davon zu überzeugen, dass man recht hat. Wenn deine Crew dir nicht glaubt, hilft auch ein perfektes Gedächtnis nichts; niemand stimmt mit dir. Und leider gibt es noch kein Tool, um Menschen zu überzeugen 🙂',
      'Für Menschen wie mich mit einem schlechten visuellen Gedächtnis oder für Einsteiger ist dieses Tool eine hilfreiche kleine Unterstützung. Es hat uns den Spielspaß zurückgebracht, weil wir dem, was wir sehen, mehr vertrauen und uns stärker auf andere Spielmechaniken konzentrieren können.',
    ],
    contactPrefix: 'Wenn du weiterhin überzeugt bist, dass dieses Tool gegen Regeln, Richtlinien oder rechtliche Vereinbarungen verstößt, kannst du mich gerne per E-Mail unter ',
    contactSuffix: ' kontaktieren. Ich verspreche, jede Anfrage ernst zu nehmen und bei Bedarf angemessen zu handeln.',
    closingParagraph: 'Allen anderen wünsche ich viel Freude mit diesem Tool und dem Spiel. Über Feedback und Vorschläge freue ich mich immer; meldet euch gerne! Viele Ideen für Funktionen kamen von Nutzerinnen und Nutzern wie euch, und dafür bin ich sehr dankbar.',
    signOff: 'Mit Metta,',
    signature: '- Alex',
  },
  'ko-KR': {
    notice: '제작자가 보관해 둔 편지를 번역한 내용이며, 여기의 주장은 당시 작성자가 쓴 내용을 반영합니다.',
    greeting: '안녕하세요. Atlesque로도 알려진 Alex입니다.',
    paragraphsBeforeContact: [
      '이 도구를 사용해 주셔서 감사합니다. 처음에는 게임을 하며 기억해야 할 것을 메모하려고 만들었지만, 다른 사람들도 즐길 수 있도록 무료로 공개하기로 했습니다.',
      '이 도구가 핵인지, 부정행위의 한 형태인지에 대해 논란이 있었습니다.',
      '먼저 잘못된 인상을 드렸다면 진심으로 사과드립니다. 누구의 게임도 망치려는 의도로 만든 것은 아닙니다. Among Us는 여러분처럼 훌륭한 플레이어가 즐길 만한 멋진 게임이니까요!',
      '하지만 이 도구가 불공정한 이점을 준다고 생각할 수 있다는 점은 이해합니다. 사실 이 도구는 메모처럼 게임이 일반적으로 허용하지 않는 일을 할 수 있게 하는 외부 도구입니다. 그러니 부정행위의 경계에 아주 가까워지는 것도 맞습니다!',
      '다만 기술적으로 이 도구는 게임의 어떤 것도 변경하지 않습니다. 게임 클라이언트를 수정하는 핵이나 게임의 작동 방식을 악용하는 버그와 달리, 플레이 중 본 것을 기록하는 기능만 제공합니다. 따라서 완전히 안전하고 합법적이며, 게임에서 차단되지 않습니다.',
      '사실 이 도구는 그저 “똑똑한” 메모장일 뿐입니다. 종이와 펜이나 Excel을 사용해도 똑같은 것을 만들 수 있습니다.',
      '이 도구가 다른 사람의 재미를 망칠까요? 생각해 봅시다. 우리 팀이 믿어 주지 않는다면, 내가 누구를 봤고 무엇을 봤는지 확신하는 것이 정말 중요할까요?',
      '이 게임에서 가장 어려운 점은 기억하는 것이 아니라 다른 사람에게 내가 맞다고 설득하는 것입니다. 팀원들이 믿지 않는다면 기억력이 완벽해도 소용없고, 누구도 나와 함께 투표하지 않을 겁니다. 안타깝게도 아직 사람을 설득해 주는 도구는 없습니다 🙂',
      '저처럼 시각 기억력이 좋지 않거나 게임을 막 시작한 사람들에게 이 도구는 꽤 유용한 보조 수단이었습니다. 본 것을 더 확신하고 다른 게임 요소에 집중할 수 있게 해 주어 게임의 재미를 되찾아 주었습니다.',
    ],
    contactPrefix: '이 도구가 규칙, 정책 또는 법적 계약을 위반한다고 여전히 생각하신다면, 이메일 ',
    contactSuffix: '로 편하게 연락해 주세요. 모든 문의를 진지하게 살펴보고 필요하면 적절히 조치하겠다고 약속드립니다.',
    closingParagraph: '그 외의 모든 분이 이 도구와 게임을 즐기시길 바랍니다. 의견이나 제안이 있다면 언제든 연락해 주세요! 많은 기능 제안이 여러분 같은 사용자에게서 나왔고, 진심으로 감사드립니다.',
    signOff: '따뜻한 마음을 담아,',
    signature: '- Alex',
  },
}
