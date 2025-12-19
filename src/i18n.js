import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // Grafy a nadpisy
        "app_title": "Shopping Lists",
        "items_overview": "Items Overview",
        "items_count": "Items Count",
        "completion_stats": "Completion Rate",
        "new_list": "New List",
        // Filtry
        "all": "All",
        "buy": "To Buy",
        "resolved": "Resolved",
        "filter_all": "All",
        "filter_active": "Active",
        "filter_archived": "Archived",
        // Detail
        "owner": "Owner",
        "members": "Members",
        "items": "Items",
        "placeholder_add": "Add new item and press Enter...",
        "no_items": "No items yet...",
        "members_title": "Members",
        "owner_label": "owner",
        "add_member": "Add Member",
        "cancel": "Cancel",
        "add": "Add",
        "placeholder_member": "Enter username...",
        // Akce a chyby
        "edit": "Edit",
        "save": "Save",
        "back_to_list": "Back to overview",
        "load_error": "Failed to load data.",
        "no_permission": "You do not have permission to view this list."
      }
    },
    cs: {
      translation: {
        // Grafy a nadpisy
        "app_title": "Nákupní seznamy",
        "items_overview": "Přehled položek",
        "items_count": "Počet položek",
        "completion_stats": "Míra splnění",
        "new_list": "Nový seznam",
        // Filtry
        "all": "Vše",
        "buy": "K nákupu",
        "resolved": "Koupeno",
        "unresolved": "K nákupu",
        "filter_all": "Vše",
        "filter_active": "Aktivní",
        "filter_archived": "Archiv",
        // Detail
        "owner": "Vlastník",
        "members": "Členové",
        "items": "Položky",
        "placeholder_add": "+ Přidat novou položku a stiskni Enter...",
        "no_items": "Žádné položky...",
        "members_title": "Členové",
        "owner_label": "vlastník",
        "add_member": "Přidat člena",
        "cancel": "Zrušit",
        "add": "Přidat",
        "placeholder_member": "Zadej jméno uživatele...",
        // Akce a chyby
        "edit": "Upravit",
        "save": "Uložit",
        "back_to_list": "Zpět na přehled",
        "load_error": "Nepodařilo se načíst data.",
        "no_permission": "Nemáte oprávnění k zobrazení tohoto seznamu."
      }
    }
  },
  lng: "cs",
  fallbackLng: "en"
});

export default i18n;