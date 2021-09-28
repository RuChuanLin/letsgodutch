const fs = require("fs");
const ghpages = require("gh-pages");

const deployFolder = "build";

fs.readFile(deployFolder + "/index.html", "utf8", (err, content) => {
  if (err) {
    console.log("讀取失敗，原因：" + err);
    return;
  }
  console.log("讀取成功，開始替代檔案引用路徑");
  const replacedContent = content.replace(/href=\"\//g, `href="./`).replace(/src=\"\//g, `src="./`);
  fs.writeFile(deployFolder + "/index.html", replacedContent, function (err) {
    if (err) {
      console.log("錯誤發生：" + err);
    }
    console.log("index.html檔案引用路徑更新完成。");
    ghpages.publish("build", function (err) {
      if (err) {
        console.log("部署 Github Page 失敗：" + err);
      }
      console.log("部署 Github Page 成功！");
    });
    console.log("正在部署 Github Page...");
  });
});
console.log("開始讀取欲部署之 index.html 檔案...");
