/**
 * DEFAULT CONFIGURATION
 * This file stores the original default values for reset functionality
 */

const DEFAULT_CONFIG = {
    "$déesse_ui_global_variables_version": "3",
    
    // HUD Screen Configuration
    "$dé:show_inventory_full_notification": true,
    "$dé:inv_full_notification_duration": 3,
    "$dé:show_world_height_meter": false,
    "$dé:show_item_durability_low_warning": true,
    "$dé:enable_center_item_stack": false,
    
    // Chat Panel
    "$dé:use_bottom_chat": true,
    "$dé:show_progress_time_chat": true,
    "$dé:max_chat_item": 50,
    
    // Player List
    "$dé:player_list_header_bg_alpha": 0.6,
    "$dé:player_list_header_bg_color": [0.0, 0.0, 0.0],
    "$dé:player_list_bg_alpha": 0.0,
    "$dé:player_list_bg_color": [0.0, 0.0, 0.0],
    "$dé:player_list_item_bg_alpha": 0.35,
    "$dé:player_list_item_bg_color": [0.0, 0.0, 0.0],
    "$dé:scoreboard_list_item_bg_alpha": 0.2,
    "$dé:scoreboard_list_item_bg_color": [0.0, 0.0, 0.0],
    
    // Night Vision
    "$dé:white_renderer_color": [1.0, 1.0, 0.9881, 1.0],
    "$dé:always_use_outside_button": false,
    
    // Utilities HUD
    "$dé:utilities_hud_position": "bottom_left",
    "$dé:utilities_hud_offset": [0, 0],
    
    // Hud Menu Toggles
    "$dé:hud_menu-debug_screen": false,
    "$dé:hud_menu-inventory_hud": false,
    "$dé:hud_menu-brightness_overlay": false,
    "$dé:hud_menu-hotbar_switcher": false,
    "$dé:hud_menu-empty_slot_counter": true,
    "$dé:hud_menu-clock_compass": true,
    "$dé:hud_menu-recovery_compass": false,
    "$dé:hud_menu-hide_chat": false,
    "$dé:hud_menu-hide_sidebarScoreboard": false,
    "$dé:hud_menu-hide_coordinates": false,
    "$dé:hud_menu-center_item_stack": false,
    "$dé:hud_menu-player_list": true,
    
    // Debug Screen
    "$dé:debugScreen_minecraft_version": true,
    "$dé:debugScreen_world_name": true,
    "$dé:debugScreen_player_chunk_position": true,
    "$dé:debugScreen_overworld_to_nether_position": true,
    "$dé:debugScreen_nether_to_overworld_position": true,
    "$dé:debugScreen_moon_phases": true,
    "$dé:debugScreen_xp_level": true,
    "$dé:debugScreen_xp_point": true,
    "$dé:debugScreen_inventory_storage": true,
    
    // Chunk Map Settings
    "$dé:enable_chunk_map": true,
    "$dé:map_show_coordinates_text": true,
    "$dé:map_show_direction_text": true,
    "$dé:map_chunk_border_alpha": 0.34,
    "$dé:map_background_alpha": 0.54,
    "$dé:map_chunk_grid": true,
    "$dé:map_view_around": true,
    "$dé:map_background": true,
    
    // Hotbar Cycler Buttons
    "$dé:hotbar_cycler_right_position": "bottom_middle",
    "$dé:hotbar_cycler_right_offset": [110, -43],
    "$dé:hotbar_cycler_right_size": [24, 24],
    "$dé:hotbar_cycler_right_alpha": 0.8,
    "$dé:hotbar_cycler_left_position": "bottom_middle",
    "$dé:hotbar_cycler_left_offset": [82, -43],
    "$dé:hotbar_cycler_left_size": [24, 24],
    "$dé:hotbar_cycler_left_alpha": 0.8,
    
    // Brightness Overlay Touch Button
    "$dé:BO_button_alpha": 0.8,
    "$dé:BO_decrease_position": "bottom_middle",
    "$dé:BO_decrease_offset": [115, -2],
    "$dé:BO_decrease_size": [18, 18],
    "$dé:BO_increase_position": "bottom_middle",
    "$dé:BO_increase_offset": [115, -23.5],
    "$dé:BO_increase_size": [18, 18],
    
    // Day Highlight
    "$dé:show_day_highlight": true,
    "$dé:day_highlight_anchor_from": "top_middle",
    "$dé:day_highlight_anchor_to": "top_middle",
    "$dé:day_highlight_offset": [0, 24],
    "$dé:day_highlight_duration": 8,
    
    // Chunk Viewer
    "$dé:show_chunk_label": true,
    "$dé:chunk_viewer_anchor_from": "top_right",
    "$dé:chunk_viewer_anchor_to": "top_right",
    "$dé:chunk_viewer_offset": [-4, 4],
    "$dé:chunk_height_meter_anchor_from": "top_right",
    "$dé:chunk_height_meter_anchor_to": "top_right",
    "$dé:chunk_height_meter_offset": [-78, 6],
    
    // Inventory HUD
    "$dé:inventory_hud_position": "bottom_right",
    "$dé:inventory_hud_offset": [-1, -1],
    "$dé:use_highlight_slot": true,
    "$dé:highlight_slot_color": [0, 1, 0],
    "$dé:highlight_slot_alpha": 0.24,
    "$dé:inventory_slot_color": [0, 0, 0],
    "$dé:inventory_slot_alpha": 0.27,
    
    // Déesse Button
    "$dé:gui_button_option_size": "default",
    "$dé:enable_gui_button_customization": false,
    "$dé:gui_button_size": [18, 18],
    "$dé:gui_button_anchor_from": "top_middle",
    "$dé:gui_button_anchor_to": "top_right",
    "$dé:gui_button_offset": [-38.5, 1],
    "$dé:gui_button_alpha": 0.8,
    
    // Chat Screen
    "$dé:show_background_chat": true,
    "$dé:switch_text_box": false,
    "$dé:show_preview_chat": false,
    
    // Container Screen
    "$dé:show_flying_item_renderer": true,
    "$dé:show_rarity_highlight": false,
    "$dé:use_number_bundle_count": true,
    "$dé:bundle_touch_tooltip_position": "bottom_middle",
    "$dé:bundle_touch_tooltip_offset": [0, -8],
    "$dé:item_tooltip_display_bg_alpha": 0.45,
    
    // Quick Container
    "$dé:instant_button_click_exit": true,
    "$dé_QC:show_search_bar": true,
    "$dé_QC:show_quick_move_items": true,
    "$dé_QC:show_quick_move_items_inv": true,
    "$dé_QC:multiple_craft_button_amount": 4,
    
    // Settings Screen
    "$dé:enable_force_spectator": true,
    
    // Tools Section
    "$dé:include_entities": true,
    "$dé:bottom_left_corner": [-128, -60, -128],
    "$dé:top_right_corner": [128, 316, 128],
    
    // Other In-Game Configuration
    "$dé:force_render_below": false,
    "$dé:enable_trade_unlocker": true,
    "$dé:enable_item_id_offset_editor": false,
    "$dé:item_id_offset": 0,
    
    // Progress Screen
    "$dé:progress_background_alpha": 0.45,
    
    // Pause Screen
    "$dé:show_trial_timer": false,
    
    // Start Screen
    "$dé:show_ui_loaded_toast": true,
    
    // Color Variables
    "$oreui_default_text_color": [0.117, 0.117, 0.121],
    "$oreui_light_text_color": [1.0, 1.0, 1.0],
    "$oreui_background_color": [0.782, 0.782, 0.786],
    "$déesse_oreui_light_button_default_text_color": [0.117, 0.117, 0.121],
    "$déesse_oreui_light_button_hover_text_color": [0.117, 0.117, 0.121],
    "$déesse_oreui_light_button_pressed_text_color": [0.117, 0.117, 0.121],
    "$déesse_oreui_light_button_locked_text_color": [0.3, 0.3, 0.3],
    "$déesse_oreui_red_button_default_text_color": [1.0, 1.0, 1.0],
    "$déesse_oreui_red_button_hover_text_color": [1.0, 1.0, 1.0],
    "$déesse_oreui_red_button_pressed_text_color": [1.0, 1.0, 1.0],
    
    // Compatibility Variables
    "$is_déesse_ui_pack": true,
    "$id_déesse_ui_global_variables_loaded": true,
    "$déesse_ui_pack_name": "Déesse UI Pack",
    "$déesse_ui_pack_version": "v1.3.0 (112)",
    "$déesse_start_text": "Déesse UI v1.3.0",
    
    // Debug
    "$deesse_ui_debug_mode": false,
    "$dés:force_use_hud_menu_desktop": false,
    "$dé:vanilla_id_offset": 0,
    
    // Durability Code
    "$dé:durability_current_value": "(#current_value + (#current_value < #item_durability_current_amount) - (#current_value > #item_durability_current_amount))",
    "$dé:durability_total_value": "(#total_value + (#total_value < #item_durability_total_amount) - (#total_value > #item_durability_total_amount))"
};
