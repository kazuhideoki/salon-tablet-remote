(function() {
              console.log(document.querySelectorAll("input"));
              var today = new Date();
              console.log(today.getDate());
              document.querySelectorAll("input")[0].value = String(
                today.getFullYear()
              );
              document.querySelectorAll("input")[1].value = String(
                today.getMonth() + 1
              );
              document.querySelectorAll("input")[2].value = String(
                today.getDate()
              );
              document.querySelectorAll("input")[3].value = "Sana Oki";
              document.querySelectorAll("input")[4].value = "93877852";
              document.querySelectorAll("input")[5].value = "G1843521M";
                
              
                document
                  .getElementById("mG61Hd")
                  .firstChild.firstChild.insertAdjacentHTML(
                    "beforeend",
                    '<input type="hidden" name="entry.1205211610" value="PG">'
                  );
                document
                .getElementById("mG61Hd")
                .firstChild.firstChild.insertAdjacentHTML(
                  "beforeend",
                  '<input type="hidden" name="entry.629889282" value="No   没有">'
                );
                document
                .getElementById("mG61Hd")
                .firstChild.firstChild.insertAdjacentHTML(
                  "beforeend",
                  '<input type="hidden" name="entry.1655662358" value="No   没有">'
                );
                document
                .getElementById("mG61Hd")
                .firstChild.firstChild.insertAdjacentHTML(
                  "beforeend",
                  '<input type="hidden" name="entry.1862492296" value="No   没有">'
                );
                document
                .getElementById("mG61Hd")
                .firstChild.firstChild.insertAdjacentHTML(
                  "beforeend",
                  '<input type="hidden" name="entry.1224402361" value="No   没有">'
                );
                document
                .getElementById("mG61Hd")
                .firstChild.firstChild.insertAdjacentHTML(
                  "beforeend",
                  '<input type="hidden" name="entry.2026266908" value="No  没有">'
                );
                document
                .getElementById("mG61Hd")
                .firstChild.firstChild.insertAdjacentHTML(
                  "beforeend",
                  '<input type="hidden" name="entry.153396864" value="No   没有">'
                );
                document
                .getElementById("mG61Hd")
                .firstChild.firstChild.insertAdjacentHTML(
                  "beforeend",
                  '<input type="hidden" name="entry.1808666857" value="No   否">'
                );
                document
                .getElementById("mG61Hd")
                .firstChild.firstChild.insertAdjacentHTML(
                  "beforeend",
                  '<input type="hidden" name="entry.290492784" value="No  否">'
                )
                console.log('入力完了');

            })();

            console.log(document.getElementById("i5").nextElementSibling.firstChild
                .firstChild.firstChild.firstChild.getAttribute('data-initial-value'));

(function() {
  function plus0(num) {
    num += "";
    if (num.length === 1) {
      return '0' + num;
    }
    return num;
  }
   var today = new Date();
   var year = today.getFullYear();
   var month = plus0(today.getMonth() + 1);
   var date = plus0(today.getDate());
   var fulldate = year + '-' + month + '-' + date;
              console.log(today.getDate());
              document.querySelectorAll("input")[0].value = String(
                year
              );
              document.querySelectorAll("input")[1].value = String(
                month
              );
              document.querySelectorAll("input")[2].value = String(
                date
              );
  document
    .getElementById("i5")
    .nextElementSibling.firstChild.firstChild.firstChild.firstChild.setAttribute(
      'value',
      fulldate
    );
  document
    .getElementById("i5")
    .nextElementSibling.firstChild.firstChild.firstChild.firstChild.setAttribute(
      'data-initial-value',
      fulldate
    );
  document
    .getElementById("i5")
    .nextElementSibling.firstChild.firstChild.firstChild.firstChild.setAttribute(
      'badinput',
      "false"
    );
  document
    .getElementById("i5")
    .nextElementSibling.firstChild.firstChild.firstChild.firstChild.setAttribute(
      'dir',
      "ltr"
    );
})();

<input type="date" class="quantumWizTextinputPaperinputInput exportInput" jsname="YPqjbf" autocomplete="off" tabindex="0" aria-labelledby="i5" data-initial-value="2019-11-01" value="2019-11-12" badinput="false" dir="ltr"></input>
<input type="date" class="quantumWizTextinputPaperinputInput exportInput" jsname="YPqjbf" autocomplete="off" tabindex="0" aria-labelledby="i5" data-initial-value="2020-10-07" badinput="false" dir="ltr"></input>