/**
 * Google Apps Script Web App endpoint for lead capture.
 *
 * Setup:
 * 1) Create/rename target sheet tab (default: "Leads")
 * 2) (Optional) Set Script Property: APPS_SCRIPT_TOKEN
 * 3) Deploy as Web App (Execute as: Me, Access: Anyone/Anyone with link)
 * 4) Re-deploy after updating this script
 */

var SHEET_NAME = "Leads";
var REQUIRED_FIELDS = ["email"];
var DEDUPE_WINDOW_MINUTES = 30;

var HEADER_COLUMNS = [
  "timestamp",
  "email",
  "step1",
  "step2",
  "step3",
  "step4",
  "step5",
  "step6",
  "step7",
  "step8",
  "step9",
  "step10",
  "step11",
  "step12",
  "step13",
  "step14",
  "step15",
  "step16",
  "step17",
  "step18",
  "step19",
  "step20",
  "step21",
  "step22",
  "step23",
  "step24",
  "step25",
  "step26",
  "step27",
  "step28",
  "step29",
  "step30",
  "step31",
  "step32",
  "step33",
  "step34",
  "step35",
  "step36",
  "step37",
  "step38",
  "step39",
  "plan_step1",
  "plan_step2",
  "payment_method",
  "source",
  "session_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "user_agent",
  "payment_paid",
  "full_name",
  "phone",
  "stripe_checkout_session_id",
  "stripe_subscription_id",
  "stripe_customer_id",
  "payment_method_id",
  "card_brand",
  "card_last4",
  "card_exp_month",
  "card_exp_year",
  "card_funding",
  "card_country",
  "card_wallet_type",
  "card_fingerprint",
  "billing_name_on_card",
  "raw_json",
];

function doGet() {
  return jsonResponse({
    ok: true,
    message: "Apps Script endpoint is running",
    sheet: SHEET_NAME,
  });
}

function doPost(e) {
  try {
    var payload = parsePayload_(e);
    authorizeRequest_(e, payload);
    validatePayload_(payload);

    var sheet = getOrCreateSheet_(SHEET_NAME);
    ensureHeader_(sheet);

    var now = new Date();
    var sessionId = getString_(payload.session_id);
    var email = normalizeEmail_(payload.email);
    var paymentPaid = getPaymentPaid_(payload);

    if (paymentPaid === "yes" && sessionId) {
      var updated = updateRowBySessionId_(sheet, sessionId, payload, now);
      if (updated) {
        return jsonResponse({ ok: true, updated: true });
      }
    }

    if (isDuplicate_(sheet, email, sessionId, DEDUPE_WINDOW_MINUTES, now)) {
      return jsonResponse({ ok: true, deduped: true });
    }

    sheet.appendRow(buildRowArray_(payload, now));
    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: errorToString_(err),
    });
  }
}

function buildRowArray_(payload, now) {
  var card = payload.card || {};

  return [
    now,
    normalizeEmail_(payload.email),
    getStepAnswer_(payload, 1),
    getStepAnswer_(payload, 2),
    getStepAnswer_(payload, 3),
    getStepAnswer_(payload, 4),
    getStepAnswer_(payload, 5),
    getStepAnswer_(payload, 6),
    getStepAnswer_(payload, 7),
    getStepAnswer_(payload, 8),
    getStepAnswer_(payload, 9),
    getStepAnswer_(payload, 10),
    getStepAnswer_(payload, 11),
    getStepAnswer_(payload, 12),
    getStepAnswer_(payload, 13),
    getStepAnswer_(payload, 14),
    getStepAnswer_(payload, 15),
    getStepAnswer_(payload, 16),
    getStepAnswer_(payload, 17),
    getStepAnswer_(payload, 18),
    getStepAnswer_(payload, 19),
    getStepAnswer_(payload, 20),
    getStepAnswer_(payload, 21),
    getStepAnswer_(payload, 22),
    getStepAnswer_(payload, 23),
    getStepAnswer_(payload, 24),
    getStepAnswer_(payload, 25),
    getStepAnswer_(payload, 26),
    getStepAnswer_(payload, 27),
    getStepAnswer_(payload, 28),
    getStepAnswer_(payload, 29),
    getStepAnswer_(payload, 30),
    getStepAnswer_(payload, 31),
    getStepAnswer_(payload, 32),
    getStepAnswer_(payload, 33),
    getStepAnswer_(payload, 34),
    getStepAnswer_(payload, 35),
    getStepAnswer_(payload, 36),
    getStepAnswer_(payload, 37),
    getStepAnswer_(payload, 38),
    getStepAnswer_(payload, 39),
    getString_(payload.plan_step1 || payload.plan || payload.selectedPlan),
    getString_(payload.plan_step2 || payload.selectedPlanSecond),
    getString_(payload.payment_method || payload.payment || payload.selectedPayment),
    getString_(payload.source),
    getString_(payload.session_id),
    getString_(payload.utm_source),
    getString_(payload.utm_medium),
    getString_(payload.utm_campaign),
    getString_(payload.user_agent),
    getPaymentPaid_(payload),
    getString_(payload.full_name),
    getString_(payload.phone),
    getString_(payload.stripe_checkout_session_id),
    getString_(payload.stripe_subscription_id),
    getString_(payload.stripe_customer_id),
    getString_(card.payment_method_id || payload.payment_method_id),
    getString_(card.card_brand || payload.card_brand),
    getString_(card.card_last4 || payload.card_last4),
    getString_(card.card_exp_month || payload.card_exp_month),
    getString_(card.card_exp_year || payload.card_exp_year),
    getString_(card.card_funding || payload.card_funding),
    getString_(card.card_country || payload.card_country),
    getString_(card.card_wallet_type || payload.card_wallet_type),
    getString_(card.card_fingerprint || payload.card_fingerprint),
    getString_(card.billing_name || payload.billing_name_on_card),
    JSON.stringify(payload),
  ];
}

function getPaymentPaid_(payload) {
  var status = getString_(payload.payment_paid || payload.payment_status).toLowerCase();
  if (status === "yes" || status === "paid" || status === "true" || status === "1") {
    return "yes";
  }
  if (status === "no" || status === "pending" || status === "false" || status === "0") {
    return "no";
  }
  return status || "no";
}

function updateRowBySessionId_(sheet, sessionId, payload, now) {
  var colMap = getColumnIndexMap_(sheet);
  var sessionCol = colMap["session_id"];
  if (!sessionCol) return false;

  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false;

  for (var r = lastRow; r >= 2; r--) {
    var rowSession = getString_(sheet.getRange(r, sessionCol).getValue());
    if (rowSession !== sessionId) continue;

    setCellIfColumnExists_(sheet, r, colMap, "timestamp", now);
    setCellIfColumnExists_(sheet, r, colMap, "payment_paid", "yes");
    setCellIfColumnExists_(sheet, r, colMap, "full_name", getString_(payload.full_name));
    setCellIfColumnExists_(sheet, r, colMap, "phone", getString_(payload.phone));
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "stripe_checkout_session_id",
      getString_(payload.stripe_checkout_session_id)
    );
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "stripe_subscription_id",
      getString_(payload.stripe_subscription_id)
    );
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "stripe_customer_id",
      getString_(payload.stripe_customer_id)
    );

    var card = payload.card || {};
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "payment_method_id",
      getString_(card.payment_method_id || payload.payment_method_id)
    );
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "card_brand",
      getString_(card.card_brand || payload.card_brand)
    );
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "card_last4",
      getString_(card.card_last4 || payload.card_last4)
    );
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "card_exp_month",
      getString_(card.card_exp_month || payload.card_exp_month)
    );
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "card_exp_year",
      getString_(card.card_exp_year || payload.card_exp_year)
    );
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "card_funding",
      getString_(card.card_funding || payload.card_funding)
    );
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "card_country",
      getString_(card.card_country || payload.card_country)
    );
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "card_wallet_type",
      getString_(card.card_wallet_type || payload.card_wallet_type)
    );
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "card_fingerprint",
      getString_(card.card_fingerprint || payload.card_fingerprint)
    );
    setCellIfColumnExists_(
      sheet,
      r,
      colMap,
      "billing_name_on_card",
      getString_(card.billing_name || payload.billing_name_on_card)
    );
    setCellIfColumnExists_(sheet, r, colMap, "raw_json", JSON.stringify(payload));

    return true;
  }

  return false;
}

function setCellIfColumnExists_(sheet, row, colMap, key, value) {
  var col = colMap[key];
  if (!col) return;
  sheet.getRange(row, col).setValue(value);
}

function getColumnIndexMap_(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol < 1) return {};

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var map = {};
  for (var i = 0; i < headers.length; i++) {
    var key = getString_(headers[i]).toLowerCase();
    if (key) map[key] = i + 1;
  }
  return map;
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Missing request body");
  }

  var body = e.postData.contents;
  try {
    var parsed = JSON.parse(body);
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Body must be a JSON object");
    }
    return parsed;
  } catch (parseErr) {
    throw new Error("Invalid JSON body");
  }
}

function authorizeRequest_(e, payload) {
  var configuredToken = PropertiesService.getScriptProperties().getProperty(
    "APPS_SCRIPT_TOKEN"
  );

  if (!configuredToken) return;

  var headerToken = "";
  if (e && e.parameter && e.parameter.token) {
    headerToken = e.parameter.token;
  }
  var bodyToken = getString_(payload.token);
  var received = headerToken || bodyToken;

  if (!received || received !== configuredToken) {
    throw new Error("Unauthorized");
  }
}

function validatePayload_(payload) {
  for (var i = 0; i < REQUIRED_FIELDS.length; i++) {
    var key = REQUIRED_FIELDS[i];
    if (!getString_(payload[key])) {
      throw new Error("Missing required field: " + key);
    }
  }

  var email = normalizeEmail_(payload.email);
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email");
  }
}

function getOrCreateSheet_(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error(
      "No active spreadsheet found. Create this script from a Google Sheet."
    );
  }

  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function ensureHeader_(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow === 0) {
    sheet.getRange(1, 1, 1, HEADER_COLUMNS.length).setValues([HEADER_COLUMNS]);
    return;
  }

  if (lastRow === 1 && lastCol === 1 && getString_(sheet.getRange(1, 1).getValue()) === "") {
    sheet.getRange(1, 1, 1, HEADER_COLUMNS.length).setValues([HEADER_COLUMNS]);
    return;
  }

  var colMap = getColumnIndexMap_(sheet);
  var missing = [];
  for (var h = 0; h < HEADER_COLUMNS.length; h++) {
    var name = HEADER_COLUMNS[h];
    if (!colMap[name]) missing.push(name);
  }

  if (missing.length === 0) return;

  var startCol = lastCol + 1;
  sheet.getRange(1, startCol, 1, missing.length).setValues([missing]);
}

function isDuplicate_(sheet, email, sessionId, windowMinutes, now) {
  var colMap = getColumnIndexMap_(sheet);
  var sessionCol = colMap["session_id"];
  var emailCol = colMap["email"] || 2;

  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false;

  var startRow = Math.max(2, lastRow - 400);
  var numRows = lastRow - startRow + 1;
  var maxCol = sheet.getLastColumn();
  var values = sheet.getRange(startRow, 1, numRows, maxCol).getValues();
  var windowMs = windowMinutes * 60 * 1000;
  var nowMs = now.getTime();

  for (var i = values.length - 1; i >= 0; i--) {
    var row = values[i];
    var ts = row[0];
    var rowEmail = normalizeEmail_(row[emailCol - 1]);
    var rowSession = sessionCol ? getString_(row[sessionCol - 1]) : "";

    if (!(ts instanceof Date)) continue;
    if (nowMs - ts.getTime() > windowMs) continue;

    if (sessionId && rowSession && sessionId === rowSession) return true;
    if (!sessionId && rowEmail && email && rowEmail === email) return true;
  }

  return false;
}

function getStepAnswer_(payload, stepNumber) {
  var stepKey = "step" + stepNumber;
  var fromTopLevel = payload[stepKey];
  if (fromTopLevel !== undefined && fromTopLevel !== null) {
    return answerToCell_(fromTopLevel);
  }

  var fromStepAnswers = payload.step_answers && payload.step_answers[stepKey];
  if (fromStepAnswers !== undefined && fromStepAnswers !== null) {
    return answerToCell_(fromStepAnswers);
  }

  var zeroBased = String(stepNumber - 1);
  var fromAnswersObj = payload.answers && payload.answers[zeroBased];
  if (fromAnswersObj !== undefined && fromAnswersObj !== null) {
    return answerToCell_(fromAnswersObj);
  }

  return "";
}

function answerToCell_(value) {
  if (Array.isArray(value)) {
    return value.join("|");
  }
  return getString_(value);
}

function normalizeEmail_(value) {
  return getString_(value).toLowerCase();
}

function getString_(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function errorToString_(err) {
  if (!err) return "Unknown error";
  if (typeof err === "string") return err;
  if (err.message) return String(err.message);
  return String(err);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
