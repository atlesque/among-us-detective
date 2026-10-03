import { expect, test } from "../fixtures/base";
import { activateAllCrew } from "../helpers/crew";
import { closeModal, openSettings } from "../helpers/modals";

const localeExamples = [
  { locale: "en-US", close: "Close", detective: "Detective", greeting: "Hi, I'm Alex, also known as Atlesque." },
  { locale: "pt-BR", close: "Fechar", detective: "Detetive", greeting: "Olá, sou Alex, também conhecido como Atlesque." },
  { locale: "es-ES", close: "Cerrar", detective: "Detective", greeting: "Hola, soy Alex, también conocido como Atlesque." },
  { locale: "fr-FR", close: "Fermer", detective: "Détective", greeting: "Bonjour, je m’appelle Alex, également connu sous le nom d’Atlesque." },
  { locale: "de-DE", close: "Schließen", detective: "Detektiv", greeting: "Hallo, ich bin Alex, auch bekannt als Atlesque." },
  { locale: "ko-KR", close: "닫기", detective: "탐정", greeting: "안녕하세요. Atlesque로도 알려진 Alex입니다." },
];

for (const example of localeExamples) {
  test(`${example.locale} localizes modal accessibility and role controls`, async ({ page }) => {
    await openSettings(page);
    await page.locator("[data-test='select-ui-language']").selectOption(example.locale);
    await expect(page.locator("[data-test='modal-close']")).toHaveAccessibleName(example.close);
    await closeModal(page);

    await activateAllCrew(page);
    await page.locator("[data-test='crew-member-red']").click();
    await expect(page.getByRole("button", { name: example.detective, exact: true })).toBeVisible();

    await page.keyboard.press("Escape");
    await page.locator("[data-test='about-btn']").click();
    await page.locator("[role='dialog'] a[href='/disclaimer']").click();
    await page.locator("[data-test='toggle-original-disclaimer-btn']").click();
    await expect(page.getByText(example.greeting, { exact: true })).toBeVisible();
  });
}
