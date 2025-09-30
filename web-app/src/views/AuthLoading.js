import React, { useEffect } from "react";
import CircularLoading from "../components/CircularLoading";
import { useSelector, useDispatch } from "react-redux";
import { api } from "common";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import moment from "moment/min/moment-with-locales";
import { initReactI18next } from 'react-i18next';

function AuthLoading(props) {
  const { t } = useTranslation();
  const {
    fetchUser,
    fetchCarTypes,
    fetchSettings,
    fetchBookings,
    fetchCancelReasons,
    fetchPromos,
    fetchDriverEarnings,
    fetchUsers,
    fetchNotifications,
    fetchEarningsReport,
    signOff,
    fetchWithdraws,
    fetchPaymentMethods,
    fetchLanguages,
    fetchWalletHistory,
    fetchCars,
    fetchComplain,
    fetchSMTP,
    fetchSos,
    fetchSMSConfig,
    fetchFleetAdminEarnings
  } = api;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const languagedata = useSelector((state) => state.languagedata);
  const settingsdata = useSelector((state) => state.settingsdata);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch, fetchSettings]);

  useEffect(() => {
    let obj = {};
    let def1 = null;

    if (!languagedata.langlist) {
        return;
    }

    // First, build the translations object and find default language
    try {
        Object.values(languagedata.langlist).forEach(value => {
            if (value.langLocale && value.keyValuePairs) {
                obj[value.langLocale] = value.keyValuePairs;
                if (value.default === true) {
                    def1 = value;
                }
            }
        });

        // If no default language was found, use English
        if (!def1) {
            def1 = {
                langLocale: 'en',
                dateLocale: 'en-gb',
                keyValuePairs: obj['en'] || {}
            };
        }

        // Try to get stored language preferences
        const storedLang = localStorage.getItem('lang');
        const langSettings = storedLang ? JSON.parse(storedLang) : null;

        // Determine which language to use
        const activeLang = (langSettings && langSettings.langLocale && obj[langSettings.langLocale])
            ? langSettings
            : def1;

        // Only add resource bundle if we have valid translations
        if (activeLang.langLocale && obj[activeLang.langLocale]) {
            // Use i18n without adding it as a dependency
            i18n.addResourceBundle(
                activeLang.langLocale,
                "translations",
                obj[activeLang.langLocale],
                true,
                true
            );
            i18n.changeLanguage(activeLang.langLocale);
            moment.locale(activeLang.dateLocale || 'en-gb');
        }
    } catch (error) {
        console.error('Language initialization error:', error);
        // Fallback to English if anything goes wrong
        if (obj['en']) {
            i18n.addResourceBundle('en', "translations", obj['en'], true, true);
            i18n.changeLanguage('en');
            moment.locale('en-gb');
        }
    }

    dispatch(fetchUser());
}, [languagedata, dispatch, fetchUser]); // Removed i18n from dependencies

  useEffect(() => {
    if (settingsdata.settings) {
      dispatch(fetchLanguages());
      dispatch(fetchCarTypes());
      document.title = settingsdata.settings.appName;
    }
  }, [settingsdata.settings, dispatch, fetchLanguages, fetchCarTypes]);

  useEffect(() => {
    if (auth.profile) {
      if (auth.profile.usertype) {
        let role = auth.profile.usertype;
        if (role === "customer") {
          dispatch(fetchBookings());
          dispatch(fetchWalletHistory());
          dispatch(fetchPaymentMethods());
          dispatch(fetchCancelReasons());
          dispatch(fetchUsers());
        } else if (role === "driver") {
          dispatch(fetchBookings());
          dispatch(fetchWithdraws());
          dispatch(fetchPaymentMethods());
          dispatch(fetchCars());
          dispatch(fetchWalletHistory());
        } else if (role === "admin") {
          dispatch(fetchUsers());
          dispatch(fetchBookings());
          dispatch(fetchPromos());
          dispatch(fetchDriverEarnings());
          dispatch(fetchFleetAdminEarnings());
          dispatch(fetchNotifications());
          dispatch(fetchEarningsReport());
          dispatch(fetchCancelReasons());
          dispatch(fetchWithdraws());
          dispatch(fetchComplain());
          dispatch(fetchPaymentMethods());
          dispatch(fetchCars());
          dispatch(fetchSMTP());
          dispatch(fetchSMSConfig());
          dispatch(fetchSos());
        } else if (role === "fleetadmin") {
          dispatch(fetchUsers());
          dispatch(fetchBookings());
          dispatch(fetchDriverEarnings());
          dispatch(fetchCars());
          dispatch(fetchCancelReasons());
          dispatch(fetchPaymentMethods());
          dispatch(fetchWalletHistory());
        } else {
          alert(t("not_valid_user_type"));
          dispatch(signOff());
        }
      } else {
        alert(t("user_issue_contact_admin"));
        dispatch(signOff());
      }
    }
  }, [
    auth.profile,
    dispatch,
    fetchBookings,
    fetchCancelReasons,
    fetchDriverEarnings,
    fetchEarningsReport,
    fetchNotifications,
    fetchPromos,
    fetchUsers,
    fetchWithdraws,
    signOff,
    fetchPaymentMethods,
    fetchWalletHistory,
    fetchCars,
    fetchComplain,
    fetchSMTP,
    fetchSMSConfig,
    fetchSos,
    fetchFleetAdminEarnings,
    t
  ]);

  return settingsdata.loading ? (
    <CircularLoading />
  ) : settingsdata.settings ? (
    auth.loading || !languagedata.langlist ? (
      <CircularLoading />
    ) : (
      props.children
    )
  ) : (
    <div>
      <span>GRÚAS VIP - Servicio 24/7</span>
  </div>
  );
}

export default AuthLoading;
