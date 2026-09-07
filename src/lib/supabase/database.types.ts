export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      booking_links: {
        Row: {
          id: string;
          key: string;
          label_fr: string;
          label_en: string;
          url: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          label_fr: string;
          label_en: string;
          url: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["booking_links"]["Insert"]>;
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          slug_fr: string;
          slug_en: string | null;
          title_fr: string;
          title_en: string;
          description_fr: string;
          description_en: string;
          starts_at: string;
          ends_at: string | null;
          image_paths: string[];
          booking_link_key: string;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug_fr: string;
          slug_en?: string | null;
          title_fr: string;
          title_en: string;
          description_fr?: string;
          description_en?: string;
          starts_at: string;
          ends_at?: string | null;
          image_paths?: string[];
          booking_link_key?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
        Relationships: [];
      };
      prices: {
        Row: {
          id: string;
          category: string;
          label_fr: string;
          label_en: string;
          description_fr: string | null;
          description_en: string | null;
          amount_cents: number;
          suffix_fr: string | null;
          suffix_en: string | null;
          booking_link_key: string;
          display_order: number;
          active: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          label_fr: string;
          label_en: string;
          description_fr?: string | null;
          description_en?: string | null;
          amount_cents: number;
          suffix_fr?: string | null;
          suffix_en?: string | null;
          booking_link_key?: string;
          display_order?: number;
          active?: boolean;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["prices"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
