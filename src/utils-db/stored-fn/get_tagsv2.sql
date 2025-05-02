CREATE OR REPLACE FUNCTION get_tags(alltags BOOL) 
RETURNS TABLE("count" int, "tag_id" int, "name" text) AS
$$
BEGIN
RETURN QUERY 
SELECT fsk_cert_tag_type.count, fsk_cert_tag_type.id, fsk_cert_tag_type.name
FROM "public"."fsk_cert_tag_type"
WHERE fsk_cert_tag_type.count >= 3
ORDER BY fsk_cert_tag_type.count DESC
LIMIT CASE WHEN NOT alltags THEN 12 END;
END;
$$
LANGUAGE 'plpgsql';