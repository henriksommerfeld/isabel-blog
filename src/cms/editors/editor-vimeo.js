const shortcode = 'vimeo:';
const urlPrefix = 'https://vimeo.com/';

export default {
  id: 'vimeo',
  label: 'Vimeo',

  fields: [
    {
      name: 'id',
      label: 'Vimeo Video ID',
      hint: `Bara själva ID:t, alltså 354980539 om länken är ${urlPrefix}354980539`,
    },
  ],
  pattern: /^`\s?vimeo: (\S+)\s?`/,
  fromBlock: (match) => {
    if (!match || !match.length || match.length < 2) return '';

    const url = match[1];
    const urlParts = url.split(urlPrefix);

    if (urlParts.length < 2) return '';

    return {
      id: urlParts[1],
    };
  },
  toBlock: (obj) => `\`${shortcode} ${urlPrefix}${obj.id}\``,
  toPreview: (obj) => {
    const shouldRenderEmptyPreview = !obj || !obj.id || !obj.id.length;
    if (shouldRenderEmptyPreview) return '<div></div>';

    return `<div class="video video-fake-background">
    <h3>Finns ingen förhandsgranskning för Vimeo, men det kommer att funka 🤞</h3>
    <img class="video-badge" src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMWFiN2VhIiBoZWlnaHQ9IjcxNCIgdmlld0JveD0iLjE3NiAuMTgxIDY5LjU5NSAyMi4yOTUxNzM1NiIgd2lkdGg9IjI1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTE1LjcyIDkuNDMxYy0uMDY5IDEuNTE0LTEuMTI3IDMuNTg4LTMuMTcyIDYuMjItMi4xMTQgMi43NDktMy45MDMgNC4xMjQtNS4zNjcgNC4xMjQtLjkwNiAwLTEuNjczLS44MzctMi4zLTIuNTEybC0xLjI1NS00LjYwNGMtLjQ2NS0xLjY3NC0uOTY0LTIuNTEyLTEuNDk4LTIuNTEyLS4xMTYgMC0uNTI0LjI0NS0xLjIyMS43MzNsLS43MzEtLjk0M2MuNzY3LS42NzQgMS41MjQtMS4zNDkgMi4yNjktMi4wMjUgMS4wMjQtLjg4NCAxLjc5Mi0xLjM1IDIuMzA1LTEuMzk3IDEuMjEtLjExNiAxLjk1NS43MTIgMi4yMzUgMi40ODMuMzAyIDEuOTEyLjUxMSAzLjEwMS42MjggMy41NjYuMzQ5IDEuNTg2LjczMyAyLjM3OCAxLjE1MiAyLjM3OC4zMjYgMCAuODE1LS41MTUgMS40NjctMS41NDMuNjUxLTEuMDI5IDEtMS44MTIgMS4wNDctMi4zNDkuMDkzLS44ODgtLjI1Ni0xLjMzMy0xLjA0Ny0xLjMzMy0uMzczIDAtLjc1Ny4wODUtMS4xNTEuMjU1Ljc2NC0yLjUwNCAyLjIyNC0zLjcyMSA0LjM4LTMuNjUyIDEuNTk4LjA0NyAyLjM1MSAxLjA4NCAyLjI1OSAzLjExMSIvPjxwYXRoIGQ9Im0yMi4yODEgMS45MThjLS4wMjMuNTgtLjMxNCAxLjEzNi0uODc0IDEuNjY5YTMuMTIgMy4xMiAwIDAgMSAtMi4yMzQuOTAzYy0xLjMyNyAwLTEuOTY4LS41NzktMS45MjEtMS43MzcuMDIyLS42MDIuMzc4LTEuMTgyIDEuMDY0LTEuNzM4LjY4Ny0uNTU1IDEuNDQ5LS44MzQgMi4yODgtLjgzNC40ODkgMCAuODk2LjE5MiAxLjIyMy41NzQuMzI1LjM4Mi40NzcuNzcuNDU0IDEuMTYzem0zLjAzOCAxMi40MTljLS42NTIgMS4yMzItMS41NDggMi4zNDktMi42ODkgMy4zNDktMS41NiAxLjM0OS0zLjExOSAyLjAyNC00LjY3OSAyLjAyNC0uNzIzIDAtMS4yNzUtLjIzMy0xLjY1OS0uNjk5LS4zODQtLjQ2NS0uNTY1LTEuMDY5LS41NDEtMS44MTQuMDIyLS43NjcuMjYxLTEuOTU0LjcxNS0zLjU2LjQ1NC0xLjYwNS42ODItMi40NjYuNjgyLTIuNTgyIDAtLjYwNS0uMjEtLjkwOC0uNjI5LS45MDgtLjEzOSAwLS41MzYuMjQ1LTEuMTg4LjczM2wtLjgwMy0uOTQzIDIuMjM1LTIuMDI1YzEuMDAxLS44ODQgMS43NDYtMS4zNSAyLjIzNi0xLjM5Ny43NjgtLjA2OSAxLjMzMi4xNTcgMS42OTMuNjc5LjM2LjUyMy40OTQgMS4yLjQwMiAyLjAzNS0uMzAzIDEuNDE1LS42MjkgMy4yMTItLjk3OCA1LjM5Mi0uMDI0Ljk5OC4zMzcgMS40OTYgMS4wODIgMS40OTYuMzI2IDAgLjkwOC0uMzQ0IDEuNzQ2LTEuMDMzLjY5OS0uNTc0IDEuMjY5LTEuMTE0IDEuNzEyLTEuNjJ6Ii8+PHBhdGggZD0ibTQ3LjEyNyAxNC4zMzZjLS42NTIgMS4yMzMtMS41NDggMi4zNDktMi42ODkgMy4zNDktMS41NiAxLjM0OS0zLjEyIDIuMDI0LTQuNjc5IDIuMDI0LTEuNTE0IDAtMi4yNDctLjgzNy0yLjItMi41MTMuMDIyLS43NDUuMTY4LTEuNjM5LjQzNi0yLjY4Ni4yNjctMS4wNDguNDEzLTEuODYyLjQzNi0yLjQ0NC4wMjQtLjg4My0uMjQ1LTEuMzI2LS44MDYtMS4zMjYtLjYwNyAwLTEuMzMxLjcyMi0yLjE3MiAyLjE2NS0uODg3IDEuNTE0LTEuMzY3IDIuOTgtMS40MzYgNC40LS4wNSAxLjAwMi4wNSAxLjc3LjI5MyAyLjMwNS0xLjYyNC4wNDctMi43NjItLjIyMS0zLjQxMS0uODAzLS41ODItLjUxMi0uODQ4LTEuMzYxLS44MDEtMi41NDkuMDItLjc0NS4xMzYtMS40OS4zNDMtMi4yMzUuMjA1LS43NDUuMzE5LTEuNDA4LjM0Mi0xLjk5MS4wNS0uODYxLS4yNjgtMS4yOTItLjk0NC0xLjI5Mi0uNTgzIDAtMS4yMTMuNjY0LTEuODg4IDEuOTkxYTEwLjE0MSAxMC4xNDEgMCAwIDAgLTEuMTE5IDQuMTU1Yy0uMDUgMS4zMDUuMDQgMi4yMTIuMjUgMi43MjQtMS41OTguMDQ3LTIuNzMzLS4yOS0zLjQwNC0xLjAxLS41NTgtLjYwMy0uODEyLTEuNTItLjc2NS0yLjc1MS4wMi0uNjAzLjEyOS0xLjQ0NS4zMjEtMi41MjQuMTkyLTEuMDguMjk5LTEuOTIxLjMyMS0yLjUyNS4wNS0uNDE3LS4wNi0uNjI3LS4zMTQtLjYyNy0uMTQgMC0uNTM2LjIzNi0xLjE4OC43MDdsLS44MzgtLjk0M2MuMTE3LS4wOTIuODQ5LS43NjggMi4yLTIuMDI1Ljk3OC0uOTA3IDEuNjQxLTEuMzczIDEuOTktMS4zOTYuNjA2LS4wNDcgMS4wOTQuMjAzIDEuNDY3Ljc1LjM3Mi41NDcuNTU5IDEuMTgyLjU1OSAxLjkwMyAwIC4yMzMtLjAyLjQ1NC0uMDcuNjY0YTYuNDMzIDYuNDMzIDAgMCAxIDEuMjIyLTEuMzk4YzEuMDcxLS45MyAyLjI3LTEuNDU1IDMuNTk3LTEuNTcxIDEuMTQxLS4wOTMgMS45NTUuMTc0IDIuNDQ1LjgwMy4zOTUuNTEyLjU4MSAxLjI0Ni41NTggMi4yLjE2My0uMTM5LjMzOC0uMjkxLjUyNS0uNDU0LjUzNC0uNjI4IDEuMDU4LTEuMTI4IDEuNTctMS41MDEuODYxLS42MjkgMS43NTktLjk3OCAyLjY4OS0xLjA0OCAxLjExOC0uMDkzIDEuOTIxLjE3MyAyLjQxLjguNDE4LjUxLjYwNSAxLjI0MS41NTkgMi4xOTEtLjAyNC42NS0uMTgxIDEuNTk1LS40NzIgMi44MzYtLjI5MiAxLjI0MS0uNDM2IDEuOTUzLS40MzYgMi4xMzktLjAyNC40ODguMDIzLjgyNC4xMzkgMS4wMDkuMTE3LjE4Ni4zOTUuMjc4LjgzOC4yNzguMzI2IDAgLjkwNy0uMzQ0IDEuNzQ2LTEuMDM0LjY5OC0uNTczIDEuMjY5LTEuMTEzIDEuNzEyLTEuNjE5eiIvPjxwYXRoIGQ9Im01Mi4yOTUgMTAuNjU0Yy4wMjItLjYyNS0uMjMzLS45MzgtLjc2Ny0uOTM4LS42OTggMC0xLjQwNy40ODEtMi4xMjcgMS40NDItLjcyMS45NjEtMS4wOTMgMS44ODItMS4xMTYgMi43NjItLjAxMyAwLS4wMTMuMTUxIDAgLjQ1MmE3Ljg2IDcuODYgMCAwIDAgMi45NjQtMS45MTFjLjY3NC0uNzQxIDEuMDIyLTEuMzQ0IDEuMDQ2LTEuODA3em03LjkyNyAzLjY0NmMtLjY3NSAxLjExNy0yLjAwMiAyLjIzMi0zLjk4MSAzLjM0OC0yLjQ2NyAxLjQxOC00Ljk3MSAyLjEyNi03LjUwOCAyLjEyNi0xLjg4NSAwLTMuMjM3LS42MjgtNC4wNTEtMS44ODUtLjU4Mi0uODYxLS44NjEtMS44ODUtLjgzOC0zLjA3Mi4wMjMtMS44ODUuODYyLTMuNjc3IDIuNTE1LTUuMzc3IDEuODE1LTEuODYyIDMuOTU3LTIuNzk0IDYuNDI1LTIuNzk0IDIuMjgyIDAgMy40OTIuOTMgMy42MzIgMi43ODcuMDkzIDEuMTg0LS41NTkgMi40MDQtMS45NTYgMy42NTgtMS40OSAxLjM3MS0zLjM2NSAyLjI0MS01LjYyMiAyLjYxMi40MTguNTgxIDEuMDQ2Ljg3MSAxLjg4NS44NzEgMS42NzYgMCAzLjUwNC0uNDI2IDUuNDgzLTEuMjc5IDEuNDItLjU5OSAyLjUzOC0xLjIyMSAzLjM1My0xLjg2NnoiLz48cGF0aCBkPSJtNjUuNzU1IDExLjgyOGE0LjQwNyA0LjQwNyAwIDAgMCAtLjI2Mi0xLjczMmMtLjE5OC0uNTI0LS40ODQtLjc4OC0uODU1LS43ODgtMS4xODggMC0yLjE2Ni42NDItMi45MzMgMS45MjUtLjY1MyAxLjA1LTEuMDAzIDIuMTctMS4wNDggMy4zNTgtLjAyNC41ODQuMDgxIDEuMDk4LjMxNCAxLjU0LjI1NS41MTQuNjE2Ljc3IDEuMDgzLjc3IDEuMDQ3IDAgMS45NDQtLjYxNyAyLjY4OS0xLjg1NC42MjgtMS4wMjcuOTY1LTIuMSAxLjAxMi0zLjIxOXptMy45NDYuMTMyYy0uMDkzIDIuMTM5LS44ODQgMy45ODctMi4zNzQgNS41NDRzLTMuMzQyIDIuMzM2LTUuNTUzIDIuMzM2Yy0xLjgzOSAwLTMuMjM2LS41OTMtNC4xOS0xLjc3OS0uNjk4LS44ODMtMS4wODMtMS45ODctMS4xNTItMy4zMTEtLjExOC0yIC42MDQtMy44MzYgMi4xNjUtNS41MSAxLjY3Ni0xLjg1OSAzLjc4Mi0yLjc4OSA2LjMyLTIuNzg5IDEuNjI5IDAgMi44NjMuNTQ3IDMuNzAyIDEuNjM5Ljc5MiAxIDEuMTUyIDIuMjkgMS4wODIgMy44NyIvPjwvc3ZnPg==" />
    </div>
    `;
  },
};
