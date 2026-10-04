import { expect, test } from "../fixtures/base";
import { activateAllCrew } from "../helpers/crew";
import { closeModal, openSettings } from "../helpers/modals";

const localeExamples = [
  { locale: "en-US", close: "Close", detective: "Detective", disclaimerBack: "Back to Detective Board" },
  { locale: "pt-BR", close: "Fechar", detective: "Detetive", disclaimerBack: "Voltar ao Quadro de Detetive" },
  { locale: "es-ES", close: "Cerrar", detective: "Detective", disclaimerBack: "Volver al Tablero de Detective" },
  { locale: "fr-FR", close: "Fermer", detective: "Détective", disclaimerBack: "Retour au Tableau de Détective" },
  { locale: "de-DE", close: "Schließen", detective: "Detektiv", disclaimerBack: "Zurück zur Detektivtafel" },
  { locale: "ko-KR", close: "닫기", detective: "탐정", disclaimerBack: "탐정 보드로 돌아가기" },
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
    await expect(page.locator("[data-test='back-to-board-top']")).toHaveText(example.disclaimerBack);
  });
}
