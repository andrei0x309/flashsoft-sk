create table public.fsk_prj_techs (
  prj_id integer not null,
  tech_id integer not null,
  created_at timestamp without time zone null default now(),
  updated_at timestamp without time zone null default now(),
  constraint fsk_prj_techs_pkey primary key (prj_id, tech_id),
  constraint fsk_prj_techs_relation_3 foreign KEY (prj_id) references fsk_prj (id) on update CASCADE on delete CASCADE,
  constraint fsk_prj_techs_relation_4 foreign KEY (tech_id) references fsk_prj_tech_type (id) on update CASCADE on delete CASCADE,
  constraint fsk_prj_techs_prj_id_check check ((prj_id > 0)),
  constraint fsk_prj_techs_tech_id_check check ((tech_id > 0))
) TABLESPACE pg_default;
