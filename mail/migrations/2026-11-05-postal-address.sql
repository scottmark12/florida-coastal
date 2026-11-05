-- Mailing address shown in every email footer (CAN-SPAM). Set it with:
-- update fc_email_settings set postal_address = 'PO Box ..., City, FL 00000' where id = 1;
alter table public.fc_email_settings add column if not exists postal_address text;
