-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "mmff_symbols" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(3) NOT NULL,
	"name" varchar(255) NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "mmff_symbols_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "mmff_exchange_rates" (
	"id" serial PRIMARY KEY NOT NULL,
	"base_currency_id" integer NOT NULL,
	"target_currency_id" integer NOT NULL,
	"date" date NOT NULL,
	"rate" numeric(18, 6) NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "mmff_exchange_rates" ADD CONSTRAINT "mmff_exchange_rates_base_currency_id_mmff_symbols_id_fk" FOREIGN KEY ("base_currency_id") REFERENCES "public"."mmff_symbols"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mmff_exchange_rates" ADD CONSTRAINT "mmff_exchange_rates_target_currency_id_mmff_symbols_id_fk" FOREIGN KEY ("target_currency_id") REFERENCES "public"."mmff_symbols"("id") ON DELETE no action ON UPDATE no action;
*/