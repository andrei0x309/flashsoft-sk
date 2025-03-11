
create table public.fsk_cert_tags (
  cert_id integer not null,
  tag_id integer not null,
  created_at timestamp without time zone null default '2022-12-11 18:19:52.096485'::timestamp without time zone,
  constraint fsk_cert_tags_pkey primary key (cert_id, tag_id),
  constraint fsk_cert_tags_cert_id_fkey foreign KEY (cert_id) references fsk_cert (id),
  constraint fsk_cert_tags_tag_id_fkey foreign KEY (tag_id) references fsk_cert_tag_type (id)
) TABLESPACE pg_default;