CREATE TABLE "mmff_continents" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"code" varchar(2) NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "mmff_continents_name_unique" UNIQUE("name"),
	CONSTRAINT "mmff_continents_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "mmff_symbols" ADD COLUMN "continent_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "mmff_symbols" ADD CONSTRAINT "mmff_symbols_continent_id_mmff_continents_id_fk" FOREIGN KEY ("continent_id") REFERENCES "public"."mmff_continents"("id") ON DELETE no action ON UPDATE no action;