import styles from "@/app/discover/discover.module.css";

type LoadingScreenProps = {
  loadingRef: React.RefObject<HTMLDivElement | null>;
};

export default function LoadingScreen({ loadingRef }: LoadingScreenProps) {
  return (
    <div className={styles.loading} ref={loadingRef as React.Ref<HTMLDivElement>}>
      Preparing your journey...
    </div>
  );
}
