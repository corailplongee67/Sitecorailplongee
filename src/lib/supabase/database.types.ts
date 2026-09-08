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
          excerpt_fr: string;
          excerpt_en: string;
          description_fr: string;
          description_en: string;
          location_fr: string;
          location_en: string;
          starts_at: string;
          ends_at: string | null;
          image_paths: string[];
          cover_image_url: string | null;
          booking_link_key: string;
          title_color: string;
          text_color: string;
          card_color_start: string;
          card_color_end: string;
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
          excerpt_fr?: string;
          excerpt_en?: string;
          description_fr?: string;
          description_en?: string;
          location_fr?: string;
          location_en?: string;
          starts_at: string;
          ends_at?: string | null;
          image_paths?: string[];
          cover_image_url?: string | null;
          booking_link_key?: string;
          title_color?: string;
          text_color?: string;
          card_color_start?: string;
          card_color_end?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
        Relationships: [];
      };
      price_sections: {
        Row: {
          id: string;
          code: string;
          title_fr: string;
          title_en: string;
          intro_fr: string;
          intro_en: string;
          note_fr: string;
          note_en: string;
          guided_label_fr: string;
          guided_label_en: string;
          autonomous_label_fr: string;
          autonomous_label_en: string;
          booking_link_key: string | null;
          display_order: number;
          layout: "list" | "comparison";
          active: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          title_fr: string;
          title_en: string;
          intro_fr?: string;
          intro_en?: string;
          note_fr?: string;
          note_en?: string;
          guided_label_fr?: string;
          guided_label_en?: string;
          autonomous_label_fr?: string;
          autonomous_label_en?: string;
          booking_link_key?: string | null;
          display_order?: number;
          layout?: "list" | "comparison";
          active?: boolean;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["price_sections"]["Insert"]>;
        Relationships: [];
      };
      prices: {
        Row: {
          id: string;
          content_key: string;
          section_code: string;
          category: string;
          category_en: string;
          subcategory_fr: string;
          subcategory_en: string;
          group_intro_fr: string;
          group_intro_en: string;
          label_fr: string;
          label_en: string;
          description_fr: string | null;
          description_en: string | null;
          amount_cents: number;
          prefix_fr: string | null;
          prefix_en: string | null;
          suffix_fr: string | null;
          suffix_en: string | null;
          price_column: "standard" | "guided" | "autonomous";
          comparison_key: string | null;
          booking_link_key: string;
          display_order: number;
          active: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          content_key: string;
          section_code: string;
          category: string;
          category_en: string;
          subcategory_fr?: string;
          subcategory_en?: string;
          group_intro_fr?: string;
          group_intro_en?: string;
          label_fr: string;
          label_en: string;
          description_fr?: string | null;
          description_en?: string | null;
          amount_cents: number;
          prefix_fr?: string | null;
          prefix_en?: string | null;
          suffix_fr?: string | null;
          suffix_en?: string | null;
          price_column?: "standard" | "guided" | "autonomous";
          comparison_key?: string | null;
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
