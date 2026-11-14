-- Retain existing events and policies; allow events already emitted by the redesign.
ALTER TABLE public.fc_events DROP CONSTRAINT fc_events_event_check;
ALTER TABLE public.fc_events ADD CONSTRAINT fc_events_event_check CHECK (event = ANY (ARRAY['pageview','quiz_start','quiz_complete','popup_shown','popup_closed','share','lead','style_tap','town_tap','reveal_step','reveal_done','reveal_skipped','reveal_replay','share_card','aerial_zoom','save_tap','ask_tap','quiz_top5','compare_add','compare_swap','engagement','link_click']::text[]));
ALTER TABLE public.fc_events DROP CONSTRAINT fc_events_detail_check;
ALTER TABLE public.fc_events ADD CONSTRAINT fc_events_detail_check CHECK (char_length(detail) <= 500);
