const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://drjfdasc:3frTrm1U3fqGaFontTZBuGZkTqGSu2XP@chunee.db.elephantsql.com/drjfdasc",
      test: "postgres://drjfdasc:3frTrm1U3fqGaFontTZBuGZkTqGSu2XP@chunee.db.elephantsql.com/drjfdasc",
      e2e: "postgres://drjfdasc:3frTrm1U3fqGaFontTZBuGZkTqGSu2XP@chunee.db.elephantsql.com/drjfdasc",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
