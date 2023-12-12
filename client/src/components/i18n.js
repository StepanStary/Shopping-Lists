import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'cs',
    fallbackLng: 'cs',
    debug: process.env.NODE_ENV === 'development',
    resources:{
      cs:{
        translation:{
            appname:"Nákupní Seznamy",
            Dark:"tmavého",
            Light:"světlého",
            loading:"Načítání..",
            ChoseLanguage:"Vyberte jazyk:",
            SelectProfile:"Prosím, vyberte si profil.",
            welcome: "Vítejte,",
            toggleText: "Přepnout do {{mode}} režimu",
            createdBy: "Vytvořil:",
            openDetails: "Otevřít detaily",
            changeListName: "Změnit název seznamu",
            deleteList: "Smazat seznam",
            deleteItem: "Smazat",
            addItem: "Přidat",
            itemLenght:"Délka nesmí přesáhnout 100 znaků.",
            selectProfile: "Vyberte profil:",
            select: "Potvrdit",
            addList: "Přidat seznam",
            newList: "Nový seznam",
            noLists: "Žádné seznamy nejsou k dispozici."
        }
      },
      en:{
        translation:{
          appname: "Shopping Lists",
          Dark:"dark",
          Light:"light",
          loading:"Loading..",
          ChoseLanguage:"Select language:",
          welcome: "Welcome,",
          SelectProfile: "Please select a profile",
          toggleText: "Switch to {{mode}} mode",
          createdBy: "Created by:",
          openDetails: "Open details",
          changeListName: "Change list name",
          deleteList: "Delete list",
          deleteItem: "Delete",
          addItem: "Add",
          itemLenght:"The length must not exceed 100 characters.",
          selectProfile: "Select profile:",
          select: "Confirm",
          addList: "Add list",
          newList: "New list",
          noLists: "No lists are available."
          }
      }
    }
  });

export default i18n;
