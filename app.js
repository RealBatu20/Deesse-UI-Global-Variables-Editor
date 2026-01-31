/**
 * MINECRAFT BEDROCK UI CONFIG EDITOR
 * Main Application Logic
 */

class ConfigEditor {
    constructor() {
        // Current configuration state (deep copy of default)
        this.currentConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
        
        // Track modified values
        this.modifiedKeys = new Set();
        
        // Read-only keys that cannot be edited
        this.readOnlyKeys = new Set([
            '$déesse_ui_global_variables_version',
            '$is_déesse_ui_pack',
            '$id_déesse_ui_global_variables_loaded',
            '$déesse_ui_pack_name',
            '$déesse_ui_pack_version',
            '$déesse_start_text'
        ]);
        
        // Section definitions for UI organization
        this.sections = {
            'hud': {
                title: 'HUD Screen Configuration',
                icon: 'fa-desktop',
                keys: [
                    '$dé:show_inventory_full_notification',
                    '$dé:inv_full_notification_duration',
                    '$dé:show_world_height_meter',
                    '$dé:show_item_durability_low_warning',
                    '$dé:enable_center_item_stack'
                ]
            },
            'chat': {
                title: 'Chat Panel',
                icon: 'fa-comments',
                keys: [
                    '$dé:use_bottom_chat',
                    '$dé:show_progress_time_chat',
                    '$dé:max_chat_item'
                ]
            },
            'playerlist': {
                title: 'Player List',
                icon: 'fa-users',
                keys: [
                    '$dé:player_list_header_bg_alpha',
                    '$dé:player_list_header_bg_color',
                    '$dé:player_list_bg_alpha',
                    '$dé:player_list_bg_color',
                    '$dé:player_list_item_bg_alpha',
                    '$dé:player_list_item_bg_color',
                    '$dé:scoreboard_list_item_bg_alpha',
                    '$dé:scoreboard_list_item_bg_color'
                ]
            },
            'nightvision': {
                title: 'Night Vision',
                icon: 'fa-eye',
                keys: [
                    '$dé:white_renderer_color',
                    '$dé:always_use_outside_button'
                ]
            },
            'utilities': {
                title: 'Utilities HUD',
                icon: 'fa-wrench',
                keys: [
                    '$dé:utilities_hud_position',
                    '$dé:utilities_hud_offset'
                ]
            },
            'hudmenu': {
                title: 'HUD Menu Toggles',
                icon: 'fa-toggle-on',
                keys: [
                    '$dé:hud_menu-debug_screen',
                    '$dé:hud_menu-inventory_hud',
                    '$dé:hud_menu-brightness_overlay',
                    '$dé:hud_menu-hotbar_switcher',
                    '$dé:hud_menu-empty_slot_counter',
                    '$dé:hud_menu-clock_compass',
                    '$dé:hud_menu-recovery_compass',
                    '$dé:hud_menu-hide_chat',
                    '$dé:hud_menu-hide_sidebarScoreboard',
                    '$dé:hud_menu-hide_coordinates',
                    '$dé:hud_menu-center_item_stack',
                    '$dé:hud_menu-player_list'
                ]
            },
            'debug': {
                title: 'Debug Screen',
                icon: 'fa-bug',
                keys: [
                    '$dé:debugScreen_minecraft_version',
                    '$dé:debugScreen_world_name',
                    '$dé:debugScreen_player_chunk_position',
                    '$dé:debugScreen_overworld_to_nether_position',
                    '$dé:debugScreen_nether_to_overworld_position',
                    '$dé:debugScreen_moon_phases',
                    '$dé:debugScreen_xp_level',
                    '$dé:debugScreen_xp_point',
                    '$dé:debugScreen_inventory_storage'
                ]
            },
            'chunkmap': {
                title: 'Chunk Map Settings',
                icon: 'fa-map',
                keys: [
                    '$dé:enable_chunk_map',
                    '$dé:map_show_coordinates_text',
                    '$dé:map_show_direction_text',
                    '$dé:map_chunk_border_alpha',
                    '$dé:map_background_alpha',
                    '$dé:map_chunk_grid',
                    '$dé:map_view_around',
                    '$dé:map_background'
                ]
            },
            'hotbar': {
                title: 'Hotbar Cycler Buttons',
                icon: 'fa-arrows-alt-h',
                keys: [
                    '$dé:hotbar_cycler_right_position',
                    '$dé:hotbar_cycler_right_offset',
                    '$dé:hotbar_cycler_right_size',
                    '$dé:hotbar_cycler_right_alpha',
                    '$dé:hotbar_cycler_left_position',
                    '$dé:hotbar_cycler_left_offset',
                    '$dé:hotbar_cycler_left_size',
                    '$dé:hotbar_cycler_left_alpha'
                ]
            },
            'brightness': {
                title: 'Brightness Overlay',
                icon: 'fa-sun',
                keys: [
                    '$dé:BO_button_alpha',
                    '$dé:BO_decrease_position',
                    '$dé:BO_decrease_offset',
                    '$dé:BO_decrease_size',
                    '$dé:BO_increase_position',
                    '$dé:BO_increase_offset',
                    '$dé:BO_increase_size'
                ]
            },
            'dayhighlight': {
                title: 'Day Highlight',
                icon: 'fa-clock',
                keys: [
                    '$dé:show_day_highlight',
                    '$dé:day_highlight_anchor_from',
                    '$dé:day_highlight_anchor_to',
                    '$dé:day_highlight_offset',
                    '$dé:day_highlight_duration'
                ]
            },
            'chunkviewer': {
                title: 'Chunk Viewer',
                icon: 'fa-th',
                keys: [
                    '$dé:show_chunk_label',
                    '$dé:chunk_viewer_anchor_from',
                    '$dé:chunk_viewer_anchor_to',
                    '$dé:chunk_viewer_offset',
                    '$dé:chunk_height_meter_anchor_from',
                    '$dé:chunk_height_meter_anchor_to',
                    '$dé:chunk_height_meter_offset'
                ]
            },
            'inventory': {
                title: 'Inventory HUD',
                icon: 'fa-box',
                keys: [
                    '$dé:inventory_hud_position',
                    '$dé:inventory_hud_offset',
                    '$dé:use_highlight_slot',
                    '$dé:highlight_slot_color',
                    '$dé:highlight_slot_alpha',
                    '$dé:inventory_slot_color',
                    '$dé:inventory_slot_alpha'
                ]
            },
            'guibutton': {
                title: 'Déesse Button',
                icon: 'fa-gamepad',
                keys: [
                    '$dé:gui_button_option_size',
                    '$dé:enable_gui_button_customization',
                    '$dé:gui_button_size',
                    '$dé:gui_button_anchor_from',
                    '$dé:gui_button_anchor_to',
                    '$dé:gui_button_offset',
                    '$dé:gui_button_alpha'
                ]
            },
            'chatscreen': {
                title: 'Chat Screen',
                icon: 'fa-comment-alt',
                keys: [
                    '$dé:show_background_chat',
                    '$dé:switch_text_box',
                    '$dé:show_preview_chat'
                ]
            },
            'container': {
                title: 'Container Screen',
                icon: 'fa-box-open',
                keys: [
                    '$dé:show_flying_item_renderer',
                    '$dé:show_rarity_highlight',
                    '$dé:use_number_bundle_count',
                    '$dé:bundle_touch_tooltip_position',
                    '$dé:bundle_touch_tooltip_offset',
                    '$dé:item_tooltip_display_bg_alpha'
                ]
            },
            'quickcontainer': {
                title: 'Quick Container',
                icon: 'fa-bolt',
                keys: [
                    '$dé:instant_button_click_exit',
                    '$dé_QC:show_search_bar',
                    '$dé_QC:show_quick_move_items',
                    '$dé_QC:show_quick_move_items_inv',
                    '$dé_QC:multiple_craft_button_amount'
                ]
            },
            'settings': {
                title: 'Settings Screen',
                icon: 'fa-cog',
                keys: [
                    '$dé:enable_force_spectator'
                ]
            },
            'tools': {
                title: 'Tools Section',
                icon: 'fa-tools',
                keys: [
                    '$dé:include_entities',
                    '$dé:bottom_left_corner',
                    '$dé:top_right_corner'
                ]
            },
            'other': {
                title: 'Other Configuration',
                icon: 'fa-ellipsis-h',
                keys: [
                    '$dé:force_render_below',
                    '$dé:enable_trade_unlocker',
                    '$dé:enable_item_id_offset_editor',
                    '$dé:item_id_offset'
                ]
            },
            'progress': {
                title: 'Progress Screen',
                icon: 'fa-spinner',
                keys: [
                    '$dé:progress_background_alpha'
                ]
            },
            'pause': {
                title: 'Pause Screen',
                icon: 'fa-pause',
                keys: [
                    '$dé:show_trial_timer'
                ]
            },
            'start': {
                title: 'Start Screen',
                icon: 'fa-play',
                keys: [
                    '$dé:show_ui_loaded_toast'
                ]
            },
            'colors': {
                title: 'Color Variables',
                icon: 'fa-palette',
                keys: [
                    '$oreui_default_text_color',
                    '$oreui_light_text_color',
                    '$oreui_background_color',
                    '$déesse_oreui_light_button_default_text_color',
                    '$déesse_oreui_light_button_hover_text_color',
                    '$déesse_oreui_light_button_pressed_text_color',
                    '$déesse_oreui_light_button_locked_text_color',
                    '$déesse_oreui_red_button_default_text_color',
                    '$déesse_oreui_red_button_hover_text_color',
                    '$déesse_oreui_red_button_pressed_text_color'
                ]
            },
            'debugvars': {
                title: 'Debug Variables',
                icon: 'fa-terminal',
                keys: [
                    '$deesse_ui_debug_mode',
                    '$dés:force_use_hud_menu_desktop',
                    '$dé:vanilla_id_offset'
                ]
            },
            'readonly': {
                title: 'Read-Only Variables',
                icon: 'fa-lock',
                keys: [
                    '$déesse_ui_global_variables_version',
                    '$is_déesse_ui_pack',
                    '$id_déesse_ui_global_variables_loaded',
                    '$déesse_ui_pack_name',
                    '$déesse_ui_pack_version',
                    '$déesse_start_text'
                ]
            }
        };

        // Metadata for special inputs
        this.inputMetadata = {
            // Position options
            '$dé:utilities_hud_position': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle'] },
            '$dé:hotbar_cycler_right_position': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle'] },
            '$dé:hotbar_cycler_left_position': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle'] },
            '$dé:BO_decrease_position': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle'] },
            '$dé:BO_increase_position': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle'] },
            '$dé:day_highlight_anchor_from': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle', 'center'] },
            '$dé:day_highlight_anchor_to': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle', 'center'] },
            '$dé:chunk_viewer_anchor_from': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle', 'center'] },
            '$dé:chunk_viewer_anchor_to': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle', 'center'] },
            '$dé:chunk_height_meter_anchor_from': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle', 'center'] },
            '$dé:chunk_height_meter_anchor_to': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle', 'center'] },
            '$dé:inventory_hud_position': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle'] },
            '$dé:gui_button_anchor_from': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle', 'center'] },
            '$dé:gui_button_anchor_to': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle', 'center'] },
            '$dé:bundle_touch_tooltip_position': { type: 'select', options: ['bottom_left', 'bottom_right', 'top_left', 'top_right', 'bottom_middle', 'top_middle'] },
            
            // Special sizes
            '$dé:gui_button_option_size': { type: 'select', options: ['default', 'small', 'medium', 'big'] },
            
            // Sliders (0-1 range)
            '$dé:player_list_header_bg_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:player_list_bg_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:player_list_item_bg_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:scoreboard_list_item_bg_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:map_chunk_border_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:map_background_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:hotbar_cycler_right_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:hotbar_cycler_left_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:BO_button_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:highlight_slot_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:inventory_slot_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:gui_button_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:item_tooltip_display_bg_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            '$dé:progress_background_alpha': { type: 'slider', min: 0, max: 1, step: 0.01 },
            
            // Integer inputs
            '$dé:inv_full_notification_duration': { type: 'number', min: 1, max: 10 },
            '$dé:max_chat_item': { type: 'number', min: 10, max: 200 },
            '$dé:day_highlight_duration': { type: 'number', min: 1, max: 30 },
            '$dé_QC:multiple_craft_button_amount': { type: 'number', min: 1, max: 10 },
            '$dé:item_id_offset': { type: 'number', min: 0, max: 1000 },
            '$dé:vanilla_id_offset': { type: 'number', min: 0, max: 1000 },
            
            // Arrays (colors, vectors)
            '$dé:player_list_header_bg_color': { type: 'array', length: 3 },
            '$dé:player_list_bg_color': { type: 'array', length: 3 },
            '$dé:player_list_item_bg_color': { type: 'array', length: 3 },
            '$dé:scoreboard_list_item_bg_color': { type: 'array', length: 3 },
            '$dé:white_renderer_color': { type: 'array', length: 4 },
            '$dé:utilities_hud_offset': { type: 'array', length: 2 },
            '$dé:hotbar_cycler_right_offset': { type: 'array', length: 2 },
            '$dé:hotbar_cycler_right_size': { type: 'array', length: 2 },
            '$dé:hotbar_cycler_left_offset': { type: 'array', length: 2 },
            '$dé:hotbar_cycler_left_size': { type: 'array', length: 2 },
            '$dé:BO_decrease_offset': { type: 'array', length: 2 },
            '$dé:BO_decrease_size': { type: 'array', length: 2 },
            '$dé:BO_increase_offset': { type: 'array', length: 2 },
            '$dé:BO_increase_size': { type: 'array', length: 2 },
            '$dé:day_highlight_offset': { type: 'array', length: 2 },
            '$dé:chunk_viewer_offset': { type: 'array', length: 2 },
            '$dé:chunk_height_meter_offset': { type: 'array', length: 2 },
            '$dé:inventory_hud_offset': { type: 'array', length: 2 },
            '$dé:gui_button_size': { type: 'array', length: 2 },
            '$dé:gui_button_offset': { type: 'array', length: 2 },
            '$dé:bundle_touch_tooltip_offset': { type: 'array', length: 2 },
            '$dé:highlight_slot_color': { type: 'array', length: 3 },
            '$dé:inventory_slot_color': { type: 'array', length: 3 },
            '$dé:bottom_left_corner': { type: 'array', length: 3 },
            '$dé:top_right_corner': { type: 'array', length: 3 },
            '$oreui_default_text_color': { type: 'array', length: 3 },
            '$oreui_light_text_color': { type: 'array', length: 3 },
            '$oreui_background_color': { type: 'array', length: 3 },
            '$déesse_oreui_light_button_default_text_color': { type: 'array', length: 3 },
            '$déesse_oreui_light_button_hover_text_color': { type: 'array', length: 3 },
            '$déesse_oreui_light_button_pressed_text_color': { type: 'array', length: 3 },
            '$déesse_oreui_light_button_locked_text_color': { type: 'array', length: 3 },
            '$déesse_oreui_red_button_default_text_color': { type: 'array', length: 3 },
            '$déesse_oreui_red_button_hover_text_color': { type: 'array', length: 3 },
            '$déesse_oreui_red_button_pressed_text_color': { type: 'array', length: 3 }
        };

        this.currentSection = 'hud';
        this.init();
    }

    init() {
        this.renderNavigation();
        this.renderSection(this.currentSection);
        this.setupEventListeners();
        this.setupDraggableWindow();
        this.updateJsonPreview();
    }

    // ==================== RENDERING ====================

    renderNavigation() {
        const navList = document.getElementById('navList');
        navList.innerHTML = '';
        
        Object.entries(this.sections).forEach(([key, section]) => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            li.innerHTML = `
                <div class="nav-link ${key === this.currentSection ? 'active' : ''}" data-section="${key}">
                    <i class="fas ${section.icon}"></i>
                    <span>${section.title}</span>
                </div>
            `;
            navList.appendChild(li);
        });
    }

    renderSection(sectionKey) {
        this.currentSection = sectionKey;
        const section = this.sections[sectionKey];
        
        // Update active nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.section === sectionKey);
        });
        
        // Update title
        document.getElementById('currentSection').innerHTML = 
            `<i class="fas ${section.icon}"></i> ${section.title}`;
        
        // Render settings
        const container = document.getElementById('editorContent');
        container.innerHTML = '<div class="settings-grid"></div>';
        const grid = container.querySelector('.settings-grid');
        
        section.keys.forEach(key => {
            const value = this.currentConfig[key];
            const isReadOnly = this.readOnlyKeys.has(key);
            const meta = this.inputMetadata[key] || { type: this.inferType(value) };
            
            const card = document.createElement('div');
            card.className = `setting-card ${isReadOnly ? 'read-only' : ''}`;
            card.dataset.key = key;
            
            card.innerHTML = `
                <div class="setting-header">
                    <div class="setting-key">
                        ${key}
                        ${isReadOnly ? '<span class="read-only-badge"><i class="fas fa-lock"></i> READ-ONLY</span>' : ''}
                    </div>
                    <div class="setting-description">${this.getDescription(key)}</div>
                </div>
                <div class="control-wrapper">
                    ${isReadOnly ? this.renderReadOnly(value) : this.renderControl(key, value, meta)}
                </div>
            `;
            
            grid.appendChild(card);
        });
        
        if (!section.keys.every(key => this.readOnlyKeys.has(key))) {
            this.attachControlListeners();
        }
    }

    renderReadOnly(value) {
        const displayValue = typeof value === 'string' ? `"${value}"` : 
                            Array.isArray(value) ? `[${value.join(', ')}]` : 
                            String(value);
        
        return `
            <div class="read-only-value">
                <i class="fas fa-lock"></i>
                <code>${displayValue}</code>
            </div>
        `;
    }

    renderControl(key, value, meta) {
        switch(meta.type) {
            case 'boolean':
                return this.renderToggle(key, value);
            case 'select':
                return this.renderSelect(key, value, meta.options);
            case 'slider':
                return this.renderSlider(key, value, meta);
            case 'number':
                return this.renderNumber(key, value, meta);
            case 'array':
                return this.renderArray(key, value, meta);
            case 'string':
            default:
                return this.renderText(key, value);
        }
    }

    renderToggle(key, value) {
        return `
            <div class="toggle-wrapper">
                <div class="toggle ${value ? 'active' : ''}" data-key="${key}" data-type="boolean">
                    <div class="toggle-slider"></div>
                </div>
                <span class="toggle-label">${value ? 'Enabled' : 'Disabled'}</span>
            </div>
        `;
    }

    renderSelect(key, value, options) {
        const optionsHtml = options.map(opt => 
            `<option value="${opt}" ${opt === value ? 'selected' : ''}>${opt}</option>`
        ).join('');
        
        return `
            <select class="dropdown" data-key="${key}" data-type="select">
                ${optionsHtml}
            </select>
        `;
    }

    renderSlider(key, value, meta) {
        return `
            <div class="slider-wrapper">
                <div class="slider-container">
                    <input type="range" class="slider" data-key="${key}" data-type="slider"
                           min="${meta.min}" max="${meta.max}" step="${meta.step}" value="${value}">
                    <span class="slider-value">${value}</span>
                </div>
            </div>
        `;
    }

    renderNumber(key, value, meta) {
        return `
            <div class="number-wrapper">
                <input type="number" class="number-input" data-key="${key}" data-type="number"
                       value="${value}" min="${meta.min}" max="${meta.max}">
            </div>
        `;
    }

    renderArray(key, value, meta) {
        const inputs = value.map((v, i) => 
            `<input type="number" class="array-input" data-index="${i}" value="${v}" step="0.01">`
        ).join('');
        
        return `
            <div class="array-inputs" data-key="${key}" data-type="array" data-length="${meta.length}">
                ${inputs}
            </div>
        `;
    }

    renderText(key, value) {
        return `
            <input type="text" class="text-input" data-key="${key}" data-type="text" value="${value}">
        `;
    }

    // ==================== EVENT HANDLERS ====================

    setupEventListeners() {
        // Navigation
        document.getElementById('navList').addEventListener('click', (e) => {
            const link = e.target.closest('.nav-link');
            if (link) {
                this.renderSection(link.dataset.section);
            }
        });
        
        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetToDefault();
        });
        
        // Download button
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadConfig();
        });
        
        // JSON Window controls
        document.getElementById('minimizeJson').addEventListener('click', () => {
            document.getElementById('jsonWindow').classList.toggle('minimized');
        });
        
        document.getElementById('closeJson').addEventListener('click', () => {
            document.getElementById('jsonWindow').style.display = 'none';
        });
    }

    attachControlListeners() {
        // Toggles
        document.querySelectorAll('.toggle[data-type="boolean"]').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const key = toggle.dataset.key;
                const newValue = !toggle.classList.contains('active');
                toggle.classList.toggle('active');
                toggle.nextElementSibling.textContent = newValue ? 'Enabled' : 'Disabled';
                this.updateValue(key, newValue);
            });
        });
        
        // Selects
        document.querySelectorAll('select[data-type="select"]').forEach(select => {
            select.addEventListener('change', () => {
                this.updateValue(select.dataset.key, select.value);
            });
        });
        
        // Sliders
        document.querySelectorAll('input[data-type="slider"]').forEach(slider => {
            slider.addEventListener('input', () => {
                slider.nextElementSibling.textContent = slider.value;
                this.updateValue(slider.dataset.key, parseFloat(slider.value));
            });
        });
        
        // Numbers
        document.querySelectorAll('input[data-type="number"]').forEach(input => {
            input.addEventListener('change', () => {
                let val = parseInt(input.value);
                if (input.min && val < parseInt(input.min)) val = parseInt(input.min);
                if (input.max && val > parseInt(input.max)) val = parseInt(input.max);
                input.value = val;
                this.updateValue(input.dataset.key, val);
            });
        });
        
        // Arrays
        document.querySelectorAll('[data-type="array"]').forEach(container => {
            const key = container.dataset.key;
            const inputs = container.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('change', () => {
                    const newArray = Array.from(inputs).map(inp => parseFloat(inp.value) || 0);
                    this.updateValue(key, newArray);
                });
            });
        });
        
        // Text inputs
        document.querySelectorAll('input[data-type="text"]').forEach(input => {
            input.addEventListener('change', () => {
                this.updateValue(input.dataset.key, input.value);
            });
        });
    }

    // ==================== LOGIC ====================

    updateValue(key, value) {
        if (this.readOnlyKeys.has(key)) return; // Prevent editing read-only keys
        
        const oldValue = this.currentConfig[key];
        this.currentConfig[key] = value;
        
        // Check if modified from default
        const isModified = JSON.stringify(value) !== JSON.stringify(DEFAULT_CONFIG[key]);
        const card = document.querySelector(`[data-key="${key}"]`).closest('.setting-card');
        
        if (isModified) {
            this.modifiedKeys.add(key);
            card.classList.add('modified');
        } else {
            this.modifiedKeys.delete(key);
            card.classList.remove('modified');
        }
        
        this.updateJsonPreview();
        this.showChangeIndicator();
    }

    updateJsonPreview() {
        const jsonCode = document.getElementById('jsonCode');
        
        // Create a copy of config with read-only keys marked
        const displayConfig = {};
        for (const [key, value] of Object.entries(this.currentConfig)) {
            if (this.readOnlyKeys.has(key)) {
                displayConfig[`🔒 ${key}`] = value;
            } else {
                displayConfig[key] = value;
            }
        }
        
        const jsonStr = JSON.stringify(displayConfig, null, 2)
            .replace(/"🔒 /g, '"'); // Remove lock emoji from actual output but keep visual indication
        
        // Syntax highlighting
        const highlighted = jsonStr
            .replace(/"([^"]+)":/g, '<span class="json-key">"$1":</span>')
            .replace(/: "([^"]*)"/g, ': <span class="json-string">"$1"</span>')
            .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
            .replace(/: ([\d.]+)/g, ': <span class="json-number">$1</span>')
            .replace(/: (null)/g, ': <span class="json-null">$1</span>');
        
        jsonCode.innerHTML = highlighted;
    }

    showChangeIndicator() {
        const indicator = document.getElementById('changeIndicator');
        // Only count non-read-only modified keys
        const editableModified = Array.from(this.modifiedKeys).filter(key => !this.readOnlyKeys.has(key));
        
        if (editableModified.length > 0) {
            indicator.style.display = 'inline-flex';
        } else {
            indicator.style.display = 'none';
        }
    }

    resetToDefault() {
        if (!confirm('Are you sure you want to reset all settings to default?')) return;
        
        // Preserve read-only values
        const readOnlyValues = {};
        this.readOnlyKeys.forEach(key => {
            readOnlyValues[key] = this.currentConfig[key];
        });
        
        this.currentConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
        
        // Restore read-only values (though they should be same as default)
        Object.assign(this.currentConfig, readOnlyValues);
        
        this.modifiedKeys.clear();
        this.renderSection(this.currentSection);
        this.updateJsonPreview();
        this.showChangeIndicator();
        this.showToast('All settings reset to default', 'success');
    }

    downloadConfig() {
        const jsonStr = JSON.stringify(this.currentConfig, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = '_global_variables.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Configuration downloaded successfully!', 'success');
    }

    setupDraggableWindow() {
        const windowEl = document.getElementById('jsonWindow');
        const header = document.getElementById('jsonHeader');
        
        let isDragging = false;
        let currentX, currentY, initialX, initialY;
        let xOffset = 0, yOffset = 0;
        
        header.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
        
        // Touch support
        header.addEventListener('touchstart', dragStart);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', dragEnd);
        
        function dragStart(e) {
            if (e.type === 'touchstart') {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }
            
            if (e.target === header || e.target.closest('.json-title')) {
                isDragging = true;
            }
        }
        
        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                
                if (e.type === 'touchmove') {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }
                
                xOffset = currentX;
                yOffset = currentY;
                
                windowEl.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        }
        
        function dragEnd() {
            initialX = windowEl.getBoundingClientRect().left;
            initialY = windowEl.getBoundingClientRect().top;
            xOffset = 0;
            yOffset = 0;
            windowEl.style.transform = 'none';
            windowEl.style.left = initialX + 'px';
            windowEl.style.top = initialY + 'px';
            isDragging = false;
        }
    }

    handleSearch(query) {
        if (!query) {
            this.renderSection(this.currentSection);
            return;
        }
        
        const lowerQuery = query.toLowerCase();
        const allKeys = Object.keys(this.currentConfig);
        const matchingKeys = allKeys.filter(key => 
            key.toLowerCase().includes(lowerQuery) ||
            this.getDescription(key).toLowerCase().includes(lowerQuery)
        );
        
        const container = document.getElementById('editorContent');
        container.innerHTML = '<div class="settings-grid"></div>';
        const grid = container.querySelector('.settings-grid');
        
        matchingKeys.forEach(key => {
            const value = this.currentConfig[key];
            const isReadOnly = this.readOnlyKeys.has(key);
            const meta = this.inputMetadata[key] || { type: this.inferType(value) };
            
            const card = document.createElement('div');
            card.className = `setting-card ${isReadOnly ? 'read-only' : ''}`;
            card.dataset.key = key;
            
            card.innerHTML = `
                <div class="setting-header">
                    <div class="setting-key">
                        ${key}
                        ${isReadOnly ? '<span class="read-only-badge"><i class="fas fa-lock"></i> READ-ONLY</span>' : ''}
                    </div>
                    <div class="setting-description">${this.getDescription(key)}</div>
                </div>
                <div class="control-wrapper">
                    ${isReadOnly ? this.renderReadOnly(value) : this.renderControl(key, value, meta)}
                </div>
            `;
            
            grid.appendChild(card);
        });
        
        if (!matchingKeys.every(key => this.readOnlyKeys.has(key))) {
            this.attachControlListeners();
        }
    }

    // ==================== HELPERS ====================

    inferType(value) {
        if (typeof value === 'boolean') return 'boolean';
        if (typeof value === 'number') return 'number';
        if (Array.isArray(value)) return 'array';
        return 'string';
    }

    getDescription(key) {
        const descriptions = {
            '$déesse_ui_global_variables_version': 'Global variables version (Read-Only)',
            '$is_déesse_ui_pack': 'Compatibility flag for Déesse UI Pack (Read-Only)',
            '$id_déesse_ui_global_variables_loaded': 'Global variables loaded flag (Read-Only)',
            '$déesse_ui_pack_name': 'Name of the UI Pack (Read-Only)',
            '$déesse_ui_pack_version': 'Version of the UI Pack (Read-Only)',
            '$déesse_start_text': 'Startup text display (Read-Only)',
            '$dé:show_inventory_full_notification': 'Show notification when inventory is full',
            '$dé:inv_full_notification_duration': 'Duration of inventory full notification (seconds)',
            '$dé:show_world_height_meter': 'Display world height meter on HUD',
            '$dé:show_item_durability_low_warning': 'Warn when item durability is low',
            '$dé:enable_center_item_stack': 'Center item stack display',
            '$dé:use_bottom_chat': 'Position chat at bottom (false = top)',
            '$dé:show_progress_time_chat': 'Show progress time in chat',
            '$dé:max_chat_item': 'Maximum chat messages to display',
            '$dé:player_list_header_bg_alpha': 'Player list header background transparency',
            '$dé:player_list_header_bg_color': 'Player list header background color [R,G,B]',
            '$dé:player_list_bg_alpha': 'Player list background transparency',
            '$dé:player_list_bg_color': 'Player list background color [R,G,B]',
            '$dé:player_list_item_bg_alpha': 'Player list item transparency',
            '$dé:player_list_item_bg_color': 'Player list item color [R,G,B]',
            '$dé:scoreboard_list_item_bg_alpha': 'Scoreboard item transparency',
            '$dé:scoreboard_list_item_bg_color': 'Scoreboard item color [R,G,B]',
            '$dé:white_renderer_color': 'Night vision color [R,G,B,A]',
            '$dé:always_use_outside_button': 'Always use outside button (touch only)',
            '$dé:utilities_hud_position': 'Position of utilities HUD',
            '$dé:utilities_hud_offset': 'Offset of utilities HUD [X,Y]',
            '$dé:hud_menu-debug_screen': 'Enable debug screen toggle',
            '$dé:hud_menu-inventory_hud': 'Enable inventory HUD toggle',
            '$dé:hud_menu-brightness_overlay': 'Enable brightness overlay toggle',
            '$dé:hud_menu-hotbar_switcher': 'Enable hotbar switcher (touch only)',
            '$dé:hud_menu-empty_slot_counter': 'Enable empty slot counter',
            '$dé:hud_menu-clock_compass': 'Enable clock/compass display',
            '$dé:hud_menu-recovery_compass': 'Enable recovery compass',
            '$dé:hud_menu-hide_chat': 'Enable chat hide toggle',
            '$dé:hud_menu-hide_sidebarScoreboard': 'Enable scoreboard hide toggle',
            '$dé:hud_menu-hide_coordinates': 'Enable coordinates hide toggle',
            '$dé:hud_menu-center_item_stack': 'Enable center item stack toggle',
            '$dé:hud_menu-player_list': 'Enable player list feature',
            '$dé:debugScreen_minecraft_version': 'Show MC version in debug screen',
            '$dé:debugScreen_world_name': 'Show world name in debug screen',
            '$dé:debugScreen_player_chunk_position': 'Show chunk position',
            '$dé:debugScreen_overworld_to_nether_position': 'Show OW to Nether coords',
            '$dé:debugScreen_nether_to_overworld_position': 'Show Nether to OW coords',
            '$dé:debugScreen_moon_phases': 'Show moon phases',
            '$dé:debugScreen_xp_level': 'Show XP level',
            '$dé:debugScreen_xp_point': 'Show XP points',
            '$dé:debugScreen_inventory_storage': 'Show inventory storage info',
            '$dé:enable_chunk_map': 'Enable chunk map feature',
            '$dé:map_show_coordinates_text': 'Show coordinates on map',
            '$dé:map_show_direction_text': 'Show direction on map',
            '$dé:map_chunk_border_alpha': 'Chunk border transparency',
            '$dé:map_background_alpha': 'Map background transparency',
            '$dé:map_chunk_grid': 'Show chunk grid',
            '$dé:map_view_around': 'View area around player',
            '$dé:map_background': 'Show map background',
            '$dé:hotbar_cycler_right_position': 'Right cycler button position',
            '$dé:hotbar_cycler_right_offset': 'Right cycler offset [X,Y]',
            '$dé:hotbar_cycler_right_size': 'Right cycler size [W,H]',
            '$dé:hotbar_cycler_right_alpha': 'Right cycler transparency',
            '$dé:hotbar_cycler_left_position': 'Left cycler button position',
            '$dé:hotbar_cycler_left_offset': 'Left cycler offset [X,Y]',
            '$dé:hotbar_cycler_left_size': 'Left cycler size [W,H]',
            '$dé:hotbar_cycler_left_alpha': 'Left cycler transparency',
            '$dé:BO_button_alpha': 'Brightness overlay button transparency',
            '$dé:BO_decrease_position': 'Decrease button position',
            '$dé:BO_decrease_offset': 'Decrease button offset [X,Y]',
            '$dé:BO_decrease_size': 'Decrease button size [W,H]',
            '$dé:BO_increase_position': 'Increase button position',
            '$dé:BO_increase_offset': 'Increase button offset [X,Y]',
            '$dé:BO_increase_size': 'Increase button size [W,H]',
            '$dé:show_day_highlight': 'Show day/night highlight',
            '$dé:day_highlight_anchor_from': 'Highlight anchor from',
            '$dé:day_highlight_anchor_to': 'Highlight anchor to',
            '$dé:day_highlight_offset': 'Highlight offset [X,Y]',
            '$dé:day_highlight_duration': 'Highlight duration (seconds)',
            '$dé:show_chunk_label': 'Show chunk labels',
            '$dé:chunk_viewer_anchor_from': 'Chunk viewer anchor from',
            '$dé:chunk_viewer_anchor_to': 'Chunk viewer anchor to',
            '$dé:chunk_viewer_offset': 'Chunk viewer offset [X,Y]',
            '$dé:chunk_height_meter_anchor_from': 'Height meter anchor from',
            '$dé:chunk_height_meter_anchor_to': 'Height meter anchor to',
            '$dé:chunk_height_meter_offset': 'Height meter offset [X,Y]',
            '$dé:inventory_hud_position': 'Inventory HUD position',
            '$dé:inventory_hud_offset': 'Inventory HUD offset [X,Y]',
            '$dé:use_highlight_slot': 'Enable slot highlighting',
            '$dé:highlight_slot_color': 'Highlight color [R,G,B]',
            '$dé:highlight_slot_alpha': 'Highlight transparency',
            '$dé:inventory_slot_color': 'Inventory slot color [R,G,B]',
            '$dé:inventory_slot_alpha': 'Inventory slot transparency',
            '$dé:gui_button_option_size': 'GUI button size option',
            '$dé:enable_gui_button_customization': 'Enable button customization',
            '$dé:gui_button_size': 'Custom button size [W,H]',
            '$dé:gui_button_anchor_from': 'Button anchor from',
            '$dé:gui_button_anchor_to': 'Button anchor to',
            '$dé:gui_button_offset': 'Button offset [X,Y]',
            '$dé:gui_button_alpha': 'Button transparency',
            '$dé:show_background_chat': 'Show chat background',
            '$dé:switch_text_box': 'Switch text box position',
            '$dé:show_preview_chat': 'Show chat preview',
            '$dé:show_flying_item_renderer': 'Show flying items',
            '$dé:show_rarity_highlight': 'Show item rarity highlight',
            '$dé:use_number_bundle_count': 'Use numbers for bundle count',
            '$dé:bundle_touch_tooltip_position': 'Bundle tooltip position',
            '$dé:bundle_touch_tooltip_offset': 'Bundle tooltip offset [X,Y]',
            '$dé:item_tooltip_display_bg_alpha': 'Item tooltip transparency',
            '$dé:instant_button_click_exit': 'Double-click to exit containers',
            '$dé_QC:show_search_bar': 'Show quick container search',
            '$dé_QC:show_quick_move_items': 'Quick move in containers',
            '$dé_QC:show_quick_move_items_inv': 'Quick move in inventory',
            '$dé_QC:multiple_craft_button_amount': 'Multiple craft button count',
            '$dé:enable_force_spectator': 'Enable force spectator mode',
            '$dé:include_entities': 'Include entities in minimap',
            '$dé:bottom_left_corner': 'Minimap bottom-left corner [X,Y,Z]',
            '$dé:top_right_corner': 'Minimap top-right corner [X,Y,Z]',
            '$dé:force_render_below': 'Render HUD below other screens',
            '$dé:enable_trade_unlocker': 'Enable trade unlocker',
            '$dé:enable_item_id_offset_editor': 'Enable item ID offset editor',
            '$dé:item_id_offset': 'Custom item ID offset',
            '$dé:progress_background_alpha': 'Progress screen transparency',
            '$dé:show_trial_timer': 'Show trial timer',
            '$dé:show_ui_loaded_toast': 'Show UI loaded notification',
            '$deesse_ui_debug_mode': 'Enable debug mode',
            '$dés:force_use_hud_menu_desktop': 'Force HUD menu on desktop',
            '$dé:vanilla_id_offset': 'Vanilla item ID offset'
        };
        
        return descriptions[key] || 'Configuration option';
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${message}`;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.editor = new ConfigEditor();
});
