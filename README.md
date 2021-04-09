# Among Us Detective - A tool to help you track suspects and more!

This simple Vue.js tool helps you to play Among Us by taking note of things you see while playing.

You can use it here: [https://amongusdetective.com/](https://amongusdetective.com/)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Notes

### Feedback

Thanks to all feedback from all users. An extensive list of credits can be found in the application's About section, under Changelog.

If you have any feedback yourself, you can leave it through the feedback form on the website (in About), [https://docs.google.com/forms/u/1/d/e/1FAIpQLSda7OlGq68xKkVyx3GsZZntwrGN_CZZJRidgCl5J6R1QIyB2g/viewform?embedded=true](directly), via [email](mailto:alexander@atlesque.com) or by opening an issue.

### Task list

The list of tasks was scraped from [https://among-us.fandom.com/wiki/Tasks#Fake_Tasks](https://among-us.fandom.com/wiki/Tasks#Fake_Tasks)

Using the following code:

```
let tasks = {
  "the-skeld": [],
  "the-airship": [],
  "mira-hq": [],
  "polus": [],
}
document.querySelector(".wikitable tbody").querySelectorAll("tr").forEach(row => {
  const name = row.querySelectorAll("td a")[0].text;
  const map = row.querySelectorAll("td a")[1].text.replace(" ", "-").toLowerCase();
  const types = row.querySelectorAll("td")[2].innerText.split(",").map(type => type.trim().replace("visual", "Visual"));
  const locations = [...row.querySelectorAll("td")[3].querySelectorAll("a")].map(location => location.innerText);
  tasks[map].push({ name, types, locations })
})
console.log(JSON.stringify(tasks, null, 2))
```

### Similar tools

There is a good deal of similar tools out there. It is not my intention to compete with any of them, as they are all useful for different means and people.

Some nice ones include:

- [https://gengarskhan.itch.io/au-detective](https://gengarskhan.itch.io/au-detective)
- [https://kedyn.github.io/fusliez-notes/](https://kedyn.github.io/fusliez-notes/)
- [https://www.amongustracker.com/](https://www.amongustracker.com/)

Regarding similarities between them: some were intentional, most by coincidence. I always test features myself to ensure they feel right from a user's perspective. AUD's philosophy is to have a simple, user-friendly, minimal tool which covers 95% of the desired game features while still being extensible enough to accommodate power users.
