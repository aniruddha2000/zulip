var common = require('../casper_lib/common.js');

common.start_and_log_in();

casper.then(function () {
    var menu_selector = '#settings-dropdown';
    casper.waitUntilVisible(menu_selector, function () {
        casper.click(menu_selector);
    });
});

casper.then(function () {
    casper.test.info('Organization page');
    casper.click('a[href^="#organization"]');
});

casper.waitForSelector('#settings_overlay_container.show', function () {
    casper.test.info('Organization page is active');
    casper.test.assertUrlMatch(/^http:\/\/[^/]+\/#organization/, 'URL suggests we are on organization page');
});

casper.then(function () {
    casper.click("li[data-section='organization-settings']");
});

function submit_notifications_stream_settings() {
    casper.then(function () {
        casper.waitUntilVisible('#org-submit-notifications[data-status="unsaved"]', function () {
            casper.test.assertSelectorHasText('#org-submit-notifications', 'Save');
        });
    });
    casper.then(function () {
        casper.click('#org-submit-notifications');
    });
}

// Test changing notifications stream
casper.then(function () {
    casper.test.info('Changing notifications stream to Verona by filtering with "verona"');
    casper.click("#id_realm_notifications_stream > button.dropdown-toggle");

    casper.waitUntilVisible('#id_realm_notifications_stream ul.dropdown-menu', function () {
        casper.sendKeys('#id_realm_notifications_stream .dropdown-search > input[type=text]', 'verona');
        casper.click("#id_realm_notifications_stream .dropdown-list-body li.stream_name");
    });
});

submit_notifications_stream_settings();

casper.then(function () {
    casper.waitUntilVisible('#org-submit-notifications[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-notifications', 'Saved');
    });
    casper.waitWhileVisible('#org-submit-notifications');
});

casper.then(function () {
    casper.click("#notifications_stream_disable");
});

submit_notifications_stream_settings();

casper.then(function () {
    casper.waitUntilVisible('#org-submit-notifications[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-notifications', 'Saved');
    });
    casper.waitWhileVisible('#org-submit-notifications');
});

// Test changing signup notifications stream
casper.then(function () {
    casper.test.info('Changing signup notifications stream to Verona by filtering with "verona"');
    casper.click("#id_realm_signup_notifications_stream > button.dropdown-toggle");

    casper.waitUntilVisible('#id_realm_signup_notifications_stream ul.dropdown-menu', function () {
        casper.sendKeys('#id_realm_signup_notifications_stream .dropdown-search > input[type=text]', 'verona');
        casper.click("#id_realm_signup_notifications_stream .dropdown-list-body li.stream_name");
    });
});

submit_notifications_stream_settings();

casper.then(function () {
    casper.waitUntilVisible('#org-submit-notifications[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-notifications', 'Saved');
    });
    casper.waitWhileVisible('#org-submit-notifications');
});

casper.then(function () {
    casper.click("#signup_notifications_stream_disable");
});

submit_notifications_stream_settings();

casper.then(function () {
    casper.waitUntilVisible('#org-submit-notifications[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-notifications', 'Saved');
    });
    casper.waitWhileVisible('#org-submit-notifications');
});

// Test permissions setting
casper.then(function () {
    casper.click("li[data-section='organization-permissions']");
});

function submit_permissions_change() {
    casper.test.assertSelectorHasText('#org-submit-other-permissions', "Save");
    casper.click('#org-submit-other-permissions');
}

// Test setting create streams policy to 'admins only'.
casper.then(function () {
    casper.test.info("Test setting create streams policy to 'admins only'.");
    casper.waitUntilVisible("#id_realm_create_stream_policy", function () {
        casper.evaluate(function () {
            $("#id_realm_create_stream_policy").val("by_admins_only").change();
        });
        submit_permissions_change();
    });
});

casper.then(function () {
    // Test that save worked.
    casper.waitUntilVisible('#org-submit-other-permissions[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-other-permissions', 'Saved');
    });
    casper.waitWhileVisible('#org-submit-notifications');
});

// Test setting create streams policy to 'members and admins'.
casper.then(function () {
    casper.test.info("Test setting create streams policy to 'members and admins'.");
    casper.waitUntilVisible("#id_realm_create_stream_policy", function () {
        casper.evaluate(function () {
            $("#id_realm_create_stream_policy").val("by_members").change();
        });
        submit_permissions_change();
    });
});

casper.then(function () {
    // Test that save worked.
    casper.waitUntilVisible('#org-submit-other-permissions[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-other-permissions', 'Saved');
    });
    casper.waitWhileVisible('#org-submit-notifications');
});

// Test setting create streams policy to 'full members'.
casper.then(function () {
    casper.test.info("Test setting create streams policy to 'waiting period.");
    casper.waitUntilVisible("#id_realm_create_stream_policy", function () {
        casper.evaluate(function () {
            $("#id_realm_create_stream_policy").val("by_full_members").change();
        });
        submit_permissions_change();
    });
});

casper.then(function () {
    // Test that save worked.
    casper.waitUntilVisible('#org-submit-other-permissions[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-other-permissions', 'Saved');
    });
    casper.waitWhileVisible('#org-submit-notifications');
});

// Test setting invite to streams policy to 'admins only'.
casper.then(function () {
    casper.test.info("Test setting invite to streams policy to 'admins only'.");
    casper.waitUntilVisible("#id_realm_invite_to_stream_policy", function () {
        casper.evaluate(function () {
            $("#id_realm_invite_to_stream_policy").val("by_admins_only").change();
        });
        submit_permissions_change();
    });
});

casper.then(function () {
    // Test that save worked.
    casper.waitUntilVisible('#org-submit-other-permissions[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-other-permissions', 'Saved');
    });
    casper.waitWhileVisible('#org-submit-notifications');
});

// Test setting invite to streams policy to 'members and admins'.
casper.then(function () {
    casper.test.info("Test setting invite to streams policy to 'members and admins'.");
    casper.waitUntilVisible("#id_realm_invite_to_stream_policy", function () {
        casper.evaluate(function () {
            $("#id_realm_invite_to_stream_policy").val("by_members").change();
        });
        submit_permissions_change();
    });
});

casper.then(function () {
    // Test that save worked.
    casper.waitUntilVisible('#org-submit-other-permissions[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-other-permissions', 'Saved');
    });
    casper.waitWhileVisible('#org-submit-notifications');
});

// Test setting invite to streams policy to 'full members'.
casper.then(function () {
    casper.test.info("Test setting invite to streams policy to 'waiting period'.");
    casper.waitUntilVisible("#id_realm_invite_to_stream_policy", function () {
        casper.evaluate(function () {
            $("#id_realm_invite_to_stream_policy").val("by_full_members").change();
        });
        submit_permissions_change();
    });
});

casper.then(function () {
    // Test that save worked.
    casper.waitUntilVisible('#org-submit-other-permissions[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-other-permissions', 'Saved');
    });
    casper.waitWhileVisible('#org-submit-notifications');
});

// Test setting new user threshold to three days.
casper.then(function () {
    casper.test.info("Test setting new user threshold to three days.");
    casper.waitUntilVisible("#id_realm_waiting_period_setting", function () {
        casper.evaluate(function () {
            $("#id_realm_waiting_period_setting").val("three_days").change();
        });
        submit_permissions_change();
    });
});

casper.then(function () {
    // Test that save worked.
    casper.waitUntilVisible('#org-submit-other-permissions[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-other-permissions', 'Saved');
        casper.test.assertNotVisible('#id_realm_waiting_period_threshold');
    });
    casper.waitWhileVisible('#org-submit-notifications');
});

// Test setting new user threshold to N days.
casper.then(function () {
    casper.test.info("Test setting new user threshold to N days.");
    casper.waitUntilVisible("#id_realm_waiting_period_setting", function () {
        casper.evaluate(function () {
            $("#id_realm_waiting_period_setting").val("custom_days").change();
        });
        submit_permissions_change();
    });
});

casper.then(function () {
    // Test that save worked.
    casper.waitUntilVisible('#org-submit-other-permissions[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-other-permissions', 'Saved');
        casper.test.assertVisible('#id_realm_waiting_period_threshold');
    });
    casper.waitWhileVisible('#org-submit-notifications');
});

casper.then(function () {
    // Test custom realm emoji
    casper.click("li[data-section='emoji-settings']");
    casper.waitUntilVisible('.admin-emoji-form', function () {
        casper.fill('form.admin-emoji-form', {
            name: 'new mouse face',
            emoji_file_input: 'static/images/logo/zulip-icon-128x128.png',
        }, true);
    });
});

casper.then(function () {
    casper.waitUntilVisible('div#admin-emoji-status', function () {
        casper.test.assertSelectorHasText('div#admin-emoji-status', 'Custom emoji added!');
    });
});

casper.then(function () {
    casper.waitUntilVisible('tr#emoji_new_mouse_face', function () {
        casper.test.assertSelectorHasText('tr#emoji_new_mouse_face .emoji_name', 'new mouse face');
        casper.test.assertExists('tr#emoji_new_mouse_face img');
        casper.click('tr#emoji_new_mouse_face button.delete');
    });
});

casper.then(function () {
    casper.waitWhileVisible('tr#emoji_new_mouse_face', function () {
        casper.test.assertDoesntExist('tr#emoji_new_mouse_face');
    });
});

// Test custom profile fields
casper.test.info("Testing custom profile fields");
casper.thenClick("li[data-section='profile-field-settings']");
casper.then(function () {
    casper.waitUntilVisible('.admin-profile-field-form', function () {
        casper.fill('form.admin-profile-field-form', {
            name: 'Teams',
            field_type: '1',
        });
        casper.click("form.admin-profile-field-form button[type='submit']");
    });
});

casper.then(function () {
    casper.waitUntilVisible('#admin-add-profile-field-status img', function () {
        casper.test.assertSelectorHasText('div#admin-add-profile-field-status', 'Saved');
    });
    casper.waitUntilVisible('.profile-field-row span.profile_field_name', function () {
        casper.test.assertSelectorHasText('.profile-field-row span.profile_field_name', 'Teams');
        casper.test.assertSelectorHasText('.profile-field-row span.profile_field_type', 'Short text');
        casper.click('.profile-field-row button.open-edit-form');
    });
});

casper.then(function () {
    casper.waitUntilVisible('tr.profile-field-form form', function () {
        casper.fill('tr.profile-field-form form.name-setting', {
            name: 'team',
        });
        casper.click('tr.profile-field-form button.submit');
    });
});

casper.then(function () {
    casper.waitUntilVisible('#admin-profile-field-status img', function () {
        casper.test.assertSelectorHasText('div#admin-profile-field-status', 'Saved');
    });
    casper.waitForSelectorTextChange('.profile-field-row span.profile_field_name', function () {
        casper.test.assertSelectorHasText('.profile-field-row span.profile_field_name', 'team');
        casper.test.assertSelectorHasText('.profile-field-row span.profile_field_type', 'Short text');
        casper.click('.profile-field-row button.delete');
    });
});

casper.then(function () {
    casper.waitUntilVisible('#admin-profile-field-status img', function () {
        casper.test.assertSelectorHasText('div#admin-profile-field-status', 'Saved');
    });
});

// Test custom realm filters
casper.then(function () {
    casper.click("li[data-section='filter-settings']");
    casper.waitUntilVisible('.admin-filter-form', function () {
        casper.fill('form.admin-filter-form', {
            pattern: '#(?P<id>[0-9]+)',
            url_format_string: 'https://trac.example.com/ticket/%(id)s',
        });
        casper.click('form.admin-filter-form button.button');
    });
});

casper.then(function () {
    casper.waitUntilVisible('div#admin-filter-status', function () {
        casper.test.assertSelectorHasText('div#admin-filter-status', 'Custom filter added!');
    });
});

casper.then(function () {
    casper.waitUntilVisible('.filter_row', function () {
        casper.test.assertSelectorHasText('.filter_row span.filter_pattern', '#(?P<id>[0-9]+)');
        casper.test.assertSelectorHasText('.filter_row span.filter_url_format_string', 'https://trac.example.com/ticket/%(id)s');
        casper.click('.filter_row button');
    });
});

casper.then(function () {
    casper.waitWhileVisible('.filter_row', function () {
        casper.test.assertDoesntExist('.filter_row');
    });
});

casper.then(function () {
    casper.waitUntilVisible('.admin-filter-form', function () {
        casper.fill('form.admin-filter-form', {
            pattern: 'a$',
            url_format_string: 'https://trac.example.com/ticket/%(id)s',
        });
        casper.click('form.admin-filter-form button.button');
    });
});

casper.then(function () {
    casper.waitUntilVisible('div#admin-filter-pattern-status', function () {
        casper.test.assertSelectorHasText('div#admin-filter-pattern-status', 'Failed: Invalid filter pattern');
    });
});

var stream_name = "Scotland";
function get_suggestions(str) {
    casper.then(function () {
        casper.evaluate(function (str) {
            $('.create_default_stream')
                .focus()
                .val(str)
                .trigger($.Event('keyup', { which: 0 }));
        }, str);
    });
}

function select_from_suggestions(item) {
    casper.then(function () {
        casper.evaluate(function (item) {
            var tah = $('.create_default_stream').data().typeahead;
            tah.mouseenter({
                currentTarget: $('.typeahead:visible li:contains("' + item + '")')[0],
            });
            tah.select();
        }, {item: item});
    });
}

// Test default stream creation and addition
casper.then(function () {
    casper.click("li[data-section='default-streams-list']");
    casper.waitUntilVisible(".create_default_stream", function () {
        // It matches with all the stream names which has 'O' as a substring (Rome, Scotland, Verona
        // etc). 'O' is used to make sure that it works even if there are multiple suggestions.
        // Uppercase 'O' is used instead of the lowercase version to make sure that the suggestions
        // are case insensitive.
        get_suggestions("O");
        select_from_suggestions(stream_name);
    });
});

casper.then(function () {
    casper.waitUntilVisible('.default_stream_row[id=' + stream_name + ']', function () {
        casper.test.assertSelectorHasText('.default_stream_row[id=' + stream_name + '] .default_stream_name', stream_name);
    });
});

casper.then(function () {
    casper.waitUntilVisible('.default_stream_row[id=' + stream_name + ']', function () {
        casper.test.assertSelectorHasText('.default_stream_row[id=' + stream_name + '] .default_stream_name', stream_name);
        casper.click('.default_stream_row[id=' + stream_name + '] button.remove-default-stream');
    });
});

casper.then(function () {
    casper.waitWhileVisible('.default_stream_row[id=' + stream_name + ']', function () {
        casper.test.assertDoesntExist('.default_stream_row[id=' + stream_name + ']');
    });
});


// TODO: Test stream deletion

// Test uploading realm icon image
casper.then(function () {
    casper.click("li[data-section='organization-profile']");
    var selector = 'img#realm-settings-icon[src^="https://secure.gravatar.com/avatar/"]';
    casper.waitUntilVisible(selector, function () {
        casper.test.assertEqual(casper.visible('#realm_icon_delete_button'), false);
        // Hack: Rather than submitting the form, we just fill the
        // form and then trigger a click event by clicking the button.
        casper.fill('form.admin-realm-form', {
            realm_icon_file_input: 'static/images/logo/zulip-icon-128x128.png',
        }, false);
        casper.click("#realm_icon_upload_button");
        casper.waitWhileVisible("#upload_icon_spinner .loading_indicator_spinner", function () {
            casper.test.assertExists('img#realm-settings-icon[src^="/user_avatars/2/realm/icon.png?version=2"]');
            casper.test.assertEqual(casper.visible('#realm_icon_delete_button'), true);
        });
    });
});

// Test deleting realm icon image
casper.then(function () {
    casper.click("li[data-section='organization-profile']");
    casper.click("#realm_icon_delete_button");
    casper.test.assertEqual(casper.visible('#realm_icon_delete_button'), true);
    casper.waitWhileVisible('#realm_icon_delete_button', function () {
        casper.test.assertExists('img#realm-settings-icon[src^="https://secure.gravatar.com/avatar/"]');
        casper.test.assertEqual(casper.visible('#realm_icon_delete_button'), false);
    });
});


casper.then(function () {
    casper.click("li[data-section='organization-settings']");
    casper.waitUntilVisible('#id_realm_default_language', function () {
        casper.test.info("Changing realm default language");
        casper.evaluate(function () {
            $('#id_realm_default_language').val('de').change();
        });
        casper.test.assertSelectorHasText('#org-submit-user-defaults', "Save");
        casper.click('#org-submit-user-defaults');
    });
});

casper.then(function () {
    casper.waitUntilVisible('#org-submit-user-defaults[data-status="saved"]', function () {
        casper.test.assertSelectorHasText('#org-submit-user-defaults',
                                          'Saved');
    });
});

// Test authentication methods setting
casper.then(function () {
    casper.click("li[data-section='auth-methods']");
    casper.waitUntilVisible(".method_row[data-method='Google'] input[type='checkbox'] + span", function () {
        casper.click(".method_row[data-method='Google'] input[type='checkbox'] + span");
        casper.test.assertSelectorHasText('#org-submit-auth_settings', "Save");
        casper.click('#org-submit-auth_settings');
    });
});

casper.then(function () {
    // Leave the page and return
    casper.click('#settings-dropdown');
    casper.click('a[href^="#streams"]');
    casper.click('#settings-dropdown');
    casper.click('a[href^="#organization"]');
    casper.click("li[data-section='auth-methods']");

    casper.waitUntilVisible(".method_row[data-method='Google'] input[type='checkbox'] + span", function () {
        // Test Setting was saved
        casper.test.assertEval(function () {
            return !document.querySelector(".method_row[data-method='Google'] input[type='checkbox']").checked;
        });
    });
});

common.then_log_out();

casper.run(function () {
    casper.test.done();
});
